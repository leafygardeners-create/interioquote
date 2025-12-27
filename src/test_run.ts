// src/test_run.ts
import { PricingEngine } from './engine/PricingEngine';
import { Room, UserSelection, ScopeSelection } from './models/types';

// 1. Setup Mock User Session
const mockRooms: Room[] = [
  { id: "r1", name: "Living Hall", type: "Living", length: 15, width: 12, height: 10 },
  { id: "r2", name: "Kids Bedroom", type: "Bedroom", length: 12, width: 10, height: 10 }
];

const mockUserSelection: UserSelection = {
  material_grade: 'Standard',
  finish_type: 'Laminate', // Should map to FIN_LAM_1MM
  hardware_tier: 'Indian'
};

const mockScopeSelection: ScopeSelection = {
  room_id: "r1", // Not used in simple logic, but part of structure
  items: {
    "LIV_TV_UNIT": { is_active: true } // User explicitly wants TV Unit
    // BED_WARDROBE will use default_active = true
  }
};

// 2. Run Engine
console.log("------------------------------------------------");
console.log("       INITIALIZING QUOTE ENGINE...             ");
console.log("------------------------------------------------");

const engine = new PricingEngine();
const boq = engine.generateBOQ(mockRooms, mockUserSelection, mockScopeSelection);

// 3. Print Results
console.log(`Project Total: ₹${boq.total_project_cost}`);
console.log(`Tax (18%):     ₹${boq.tax_amount}`);
console.log(`Grand Total:   ₹${boq.grand_total}`);
console.log("------------------------------------------------");
console.log("Detailed Breakdown:");

boq.rooms.forEach(room => {
  console.log(`\n> ROOM: ${room.room_name} (Total: ₹${room.total_cost})`);
  room.items.forEach(item => {
    console.log(`  - ${item.name}`);
    console.log(`    Spec: ${item.description}`);
    console.log(`    Qty: ${item.qty} ${item.unit} | Rate: ₹${item.rate} | Amt: ₹${item.amount}`);
  });
});
console.log("------------------------------------------------");
