import {
  Room,
  UserSelection,
  ScopeSelection,
  ScopeGroupDefinition,
  RateCardItem,
  GrandTotalBOQ,
  RoomBOQ,
  BOQLineItem
} from '../models/types';

import scopeDefinitionsRaw from '../data/scope_definitions.json';
import rateCardRaw from '../data/rate_card.json';

const scopeDefinitions: ScopeGroupDefinition[] = scopeDefinitionsRaw as any;
const rateCard: RateCardItem[] = rateCardRaw as any;

export class PricingEngine {

  /**
   * Helper to safely evaluate mathematical formulas string with context
   */
  private evaluateFormula(formula: string, context: any): number {
    // SECURITY NOTE: In a real prod env, use a math expression parser library like 'mathjs'
    // For this prototype, we use a constrained Function evaluation.
    try {
      const keys = Object.keys(context);
      const values = Object.values(context);
      const func = new Function(...keys, `return ${formula};`);
      const result = func(...values);
      return Math.max(0, parseFloat(result.toFixed(2))); // Ensure no negative qty
    } catch (e) {
      console.error(`Error evaluating formula: "${formula}" with context:`, context, e);
      return 0;
    }
  }

  private getRateItem(id: string): RateCardItem | undefined {
    return rateCard.find(r => r.item_id === id);
  }

  /**
   * Resolves the finish material ID based on user selection.
   * Simple mapping logic for MVP.
   */
  private resolveFinishId(allowedFinishes: string[], userSelection: UserSelection): string {
    // Map user generic selection (e.g., "Laminate") to specific ID (e.g. "FIN_LAM_1MM")
    // If user selected 'PU', look for a 'PU' finish in allowed list.

    // 1. Try exact match on type
    if (userSelection.finish_type === 'Laminate') {
      const match = allowedFinishes.find(id => id.includes('LAM'));
      if (match) return match;
    }
    if (userSelection.finish_type === 'Acrylic') {
      const match = allowedFinishes.find(id => id.includes('ACRYLIC'));
      if (match) return match;
    }
    if (userSelection.finish_type === 'PU') {
      const match = allowedFinishes.find(id => id.includes('PU'));
      if (match) return match;
    }

    // 2. Fallback to first allowed
    return allowedFinishes[0];
  }

  public generateBOQ(
    rooms: Room[],
    userSelection: UserSelection,
    scopeSelection: ScopeSelection
  ): GrandTotalBOQ {

    const roomBOQs: RoomBOQ[] = [];
    let projectTotal = 0;

    for (const room of rooms) {
      const roomItems: BOQLineItem[] = [];
      let roomTotal = 0;

      // Filter scopes relevant to this room type
      const relevantScopes = scopeDefinitions.filter(s => s.room_type === room.type);

      for (const scope of relevantScopes) {
        // Check if user has this scope active
        const scopeSettings = scopeSelection.items[scope.scope_id];
        // If scope not in selection map, assume default active (or false if strict)
        const isActive = scopeSettings ? scopeSettings.is_active : scope.default_active;

        if (!isActive) continue;

        for (const sub of scope.sub_elements) {
          // 1. Calculate Quantity
          const context = {
            room_width: room.width,
            room_length: room.length,
            room_height: room.height
          };
          const qty = this.evaluateFormula(sub.qty_formula, context);

          if (qty <= 0) continue;

          // 2. Identify Rates
          // A sub-element implies a Structure (Material) AND a Surface (Finish) usually.
          // For simplicity in this model, we sum them up or treat them as composite if needed.
          // Here, we'll calculate Material Cost + Finish Cost separately and sum them into one line item

          const materialItem = this.getRateItem(sub.default_material_id);
          const finishId = this.resolveFinishId(sub.allowed_finishes, userSelection);
          const finishItem = this.getRateItem(finishId);

          if (!materialItem) {
            console.warn(`Missing rate for material: ${sub.default_material_id}`);
            continue;
          }

          // Cost Calculation Logic
          // Cost = (BaseRate + Labor) * (1 + Margin)

          // A. Structure Cost
          const matUnitCost = (materialItem.base_rate + materialItem.labor_rate) * (1 + materialItem.margin_percent);

          // B. Finish Cost (Optional, if finish exists)
          let finUnitCost = 0;
          let finishName = "";
          if (finishItem) {
             finUnitCost = (finishItem.base_rate + finishItem.labor_rate) * (1 + finishItem.margin_percent);
             finishName = ` + ${finishItem.name}`;
          }

          const totalUnitRate = matUnitCost + finUnitCost;
          const totalAmount = parseFloat((qty * totalUnitRate).toFixed(2));

          // Create BOQ Line
          roomItems.push({
            id: `${scope.scope_id}_${sub.id}`,
            name: `${scope.name} - ${sub.name}`,
            description: `${materialItem.name}${finishName}`,
            qty: qty,
            unit: sub.unit_type,
            rate: parseFloat(totalUnitRate.toFixed(2)),
            amount: totalAmount,
            spec_breakdown: {
              material_cost: materialItem.base_rate + (finishItem ? finishItem.base_rate : 0),
              labor_cost: materialItem.labor_rate + (finishItem ? finishItem.labor_rate : 0),
              margin: materialItem.margin_percent // Simplified
            }
          });

          roomTotal += totalAmount;
        }
      }

      roomBOQs.push({
        room_id: room.id,
        room_name: room.name,
        items: roomItems,
        total_cost: parseFloat(roomTotal.toFixed(2))
      });

      projectTotal += roomTotal;
    }

    // Tax Calculation (GST 18%)
    const taxAmount = parseFloat((projectTotal * 0.18).toFixed(2));
    const grandTotal = parseFloat((projectTotal + taxAmount).toFixed(2));

    return {
      rooms: roomBOQs,
      total_project_cost: parseFloat(projectTotal.toFixed(2)),
      tax_amount: taxAmount,
      grand_total: grandTotal,
      currency: "INR",
      generated_at: new Date().toISOString()
    };
  }
}
