# Internal Admin Panel: The "Cost Control" Spreadsheet

**Purpose:** Manage the "Brain" of the quote engine.
**Design Philosophy:** Data density, Bulk editing, Version control. "Google Sheets on Steroids."

## Navigation Sidebar
*   **Dashboard** (System Health)
*   **Master Data**
    *   Cities / Locations
    *   Materials & Finishes
    *   Hardware
*   **Scope Engine**
    *   **Scope Groups** (TV Unit, Wardrobe, Kitchen Base)
    *   **Sub-Element Library** (Carcass, Shutter, Drawer)
    *   **Construction Rules** (Logic & Constraints)
*   **Pricing**
    *   Rate Cards (Base Rates)
    *   Margins & Tax
*   **Quotes** (View Customer Quotes)

---

## Screen 1: Rate Card Management (Spreadsheet View)

**Filters:** [ City: Bangalore ] [ Material: Plywood ] [ Date: Current ]

| ID | Item Name | Unit | Base Cost (₹) | Labor (₹) | Margin (%) | Final Price (₹) | Last Updated |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| MAT01 | BWR Ply 18mm | sqft | 85 | 40 | 15% | 143.75 | 2 days ago |
| MAT02 | BWP Ply 18mm | sqft | 110 | 45 | 15% | 178.25 | 2 days ago |
| FIN01 | Laminate 1mm | sqft | 40 | 25 | 15% | 74.75 | Yesterday |

**Actions:**
*   [ Bulk Import (CSV) ]
*   [ Export ]
*   **Edit Mode:** Click cell to edit value directly.
*   **Change Log:** "User X changed MAT01 Base Cost from 80 to 85."

---

## Screen 2: Scope & Assembly Builder (The Logic Core)

**Context:** Defining hierarchical assemblies. "How do we build a TV Unit?"

**Selector:** [ Living Room ] > [ TV Unit (LIV_TV_UNIT) ]

**1. Sub-Element Configuration:**
| Sub-Element | Unit Logic | Material Default | Hardware Link |
| :--- | :--- | :--- | :--- |
| **Base Cabinet** | `User_Length * 1.5` (rft) | @Def_Ply_BWR | @Hinge_Soft |
| **Wall Panel** | `User_TV_Size * 2.0` (sqft)| @Def_Lam_1mm | - |
| **Open Shelf** | `User_Length * 0.5` (rft) | @Def_Lam_1mm | - |
| **Glass Shutter**| `Manual_Input` (sqft) | @Glass_Tough | @Gas_Lift |

**2. Quantity Logic Editor (Code/Formula Block):**
```javascript
// Variable Definitions
let base_depth = 450; // mm
let wall_depth = 300; // mm

// Logic
if (User.TV_Size > 55) {
  Recommend_Panel_Width = 6; // feet
} else {
  Recommend_Panel_Width = 4; // feet
}
```

**3. Finish Options Mapping:**
*   **Laminate:** [x] Enabled (Base Rate)
*   **Membrane:** [x] Enabled (Rate * 1.3)
*   **Veneer:** [ ] Disabled for this unit
*   **PU:** [x] Enabled (Rate * 2.0)

---

## Screen 3: Rule Engine (Assumptions & Exclusions)

**Context:** Managing the text that appears on the consumer side.

| Rule Trigger | Condition | User Message (Warning/Info) | Severity |
| :--- | :--- | :--- | :--- |
| **Wet Area** | Room = Kitchen AND Mat != BWP | "Kitchens require water-proof material." | Critical |
| **Height** | Ceiling > 10ft | "Standard quote assumes 10ft. Extra charges apply." | Info |
| **Civil** | Always | "Civil work is excluded." | Global Exclusion |

---

## Screen 4: Version Control & Publishing

**Context:** Pushing changes to the live site.

**Status:** *Draft Changes (15)*
*   Updated Rate Card: Bangalore (+5% increase)
*   New Item: "Study Table Foldable"

**Actions:**
*   [ Simulate Quote ] (Run a test quote with new data)
*   [ Publish to Live ]
*   [ Rollback ]

**Why:** Ensures no broken pricing goes live without verification.
