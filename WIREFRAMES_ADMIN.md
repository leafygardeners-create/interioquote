# Internal Admin Panel: The "Cost Control" Spreadsheet

**Purpose:** Manage the "Brain" of the quote engine.
**Design Philosophy:** Data density, Bulk editing, Version control. "Google Sheets on Steroids."

## Navigation Sidebar
*   **Dashboard** (System Health)
*   **Master Data**
    *   Cities / Locations
    *   Materials & Finishes
    *   Hardware
*   **Scope Logic**
    *   Room Templates (Default items per room)
    *   Item Assemblies (What makes up a Wardrobe?)
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

## Screen 2: Item Assembly Builder (The Logic)

**Context:** Defining what "Wardrobe (Standard)" actually means.

**Header:** Edit Assembly: "Wardrobe_Sliding_2Door"
**Rules:** [ If Height > 7ft, Add Loft ] [ If Width > 4ft, Add Divider ]

**BOM (Bill of Materials) Definition:**
| Component | Formula | Material Ref | Qty Formula |
| :--- | :--- | :--- | :--- |
| **Carcass** | Internal Body | @Ref_Ply_18mm | (H * W * D) * 2.5 |
| **Shutter** | External Door | @Ref_Ply_18mm | (H * W) |
| **Finish** | Surface | @Ref_Lam_1mm | (H * W) * 2 |
| **Hinges** | Hardware | @Ref_Hinge_Soft | RoundUp(H / 2) * 2 |

**Test Preview:**
*   *Input:* H=7, W=4, D=2.
*   *Output Cost:* ₹35,400.

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
