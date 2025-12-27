// src/models/types.ts

// --- Master Data Models (Admin Side) ---

export interface RateCardItem {
  item_id: string; // e.g., "MAT_PLY_BWP"
  name: string;
  category: 'Material' | 'Finish' | 'Hardware' | 'Labor';
  unit: 'sqft' | 'rft' | 'nos' | 'lumpsum';
  base_rate: number;
  labor_rate: number;
  margin_percent: number; // e.g., 0.15 for 15%
}

export interface SubElementDefinition {
  id: string; // e.g., "base_cab"
  name: string;
  unit_type: 'sqft' | 'rft' | 'nos';
  // Formulas use context variables: room_width, room_height, etc.
  qty_formula: string;
  default_material_id: string;
  allowed_finishes: string[]; // List of finish IDs
  hardware_rules?: {
    hinges_per_unit?: number; // e.g., 2 per door (calculated via another formula usually, but keeping simple)
    channel_type?: string;
  };
}

export interface ScopeGroupDefinition {
  scope_id: string; // e.g., "LIV_TV_UNIT"
  name: string;
  room_type: string; // "Living", "Bedroom", etc.
  sub_elements: SubElementDefinition[];
  default_active: boolean;
}

// --- User Session Models (Client Side) ---

export interface Room {
  id: string;
  name: string; // "Living Room"
  type: string; // "Living", "Bedroom"
  length: number; // feet
  width: number;  // feet
  height: number; // feet (default 10)
}

export interface UserSelection {
  // Global defaults
  material_grade: 'Standard' | 'Premium'; // Maps to specific rate IDs internally
  finish_type: 'Laminate' | 'Acrylic' | 'PU';
  hardware_tier: 'Indian' | 'International';

  // Room specific overrides can be added here
}

export interface ScopeSelection {
  room_id: string;
  items: {
    [scope_id: string]: {
      is_active: boolean;
      // potentially custom dimensions overrides here
    };
  };
}

// --- Output Models (BOQ) ---

export interface BOQLineItem {
  id: string;
  name: string; // "TV Unit - Base Cabinet"
  description: string; // "BWP Ply + Laminate"
  qty: number;
  unit: string;
  rate: number;
  amount: number;
  spec_breakdown: {
    material_cost: number;
    labor_cost: number;
    margin: number;
  };
}

export interface RoomBOQ {
  room_id: string;
  room_name: string;
  items: BOQLineItem[];
  total_cost: number;
}

export interface GrandTotalBOQ {
  rooms: RoomBOQ[];
  total_project_cost: number;
  tax_amount: number;
  grand_total: number;
  currency: string;
  generated_at: string;
}
