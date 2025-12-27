# Internal Scope Definitions & Logic

This document defines the "Scope Engine" logic. It is the internal source of truth for how composite items (like a TV Unit) are broken down into priceable sub-elements.

**System Concept:**
`Unit (Scope Group)` -> `Sub-elements` -> `Quantity Logic` -> `Finish/Material` -> `Hardware`

---

## 🛋 LIVING / FAMILY AREA

### A) TV Unit / Media Wall
**Scope Group ID:** `LIV_TV_UNIT`
*   **Sub-elements:**
    1.  **Base Cabinet:**
        *   *Unit:* rft (running feet) or sqft.
        *   *Default Depth:* 450mm.
        *   *Finish:* Laminate, Membrane, Veneer, PU.
    2.  **Wall-Mounted Panels:**
        *   *Unit:* sqft.
        *   *Default Depth:* 300mm.
        *   *Logic:* Area tied to TV size & wall width.
    3.  **Open Shelves / Niches:**
        *   *Unit:* rft.
    4.  **Glass Shutters:**
        *   *Unit:* sqft (Area of glass).
*   **Hardware Rules:**
    *   *Hinges:* Standard or Premium (Soft close).
    *   *Channels:* For drawers (Soft close).
    *   *Push-to-open:* Optional toggle.

### B) Crockery / Bar Unit
**Scope Group ID:** `LIV_CROCKERY`
*   **Sub-elements:**
    1.  **Base Cabinets:** Same logic as TV unit.
    2.  **Wall Cabinets:** Reduced depth (300-350mm).
    3.  **Glass Shutters:** Framing + Glass cost.
    4.  **Mirror Back Panel:** Optional add-on (sqft).
    5.  **LED Strip:** Running feet.

### C) Ceiling (Living)
**Scope Group ID:** `LIV_CEILING`
*   **Sub-elements:**
    1.  **Flat Gypsum:** sqft (Area).
    2.  **Cove Lighting:** rft (Perimeter).
    3.  **Perimeter Bands:** rft.

### D) Wall Finishes
**Scope Group ID:** `LIV_WALLS`
*   **Sub-elements:**
    1.  **Paint:** sqft (Wall area). Includes Putty + Emulsion.
    2.  **Accent Wall:** sqft. Cost replaces standard paint cost for that wall.
    3.  **Wallpaper:** sqft (Supply + Install).

---

## 🛏 BEDROOM

### A) Wardrobe
**Scope Group ID:** `BED_WARDROBE`
*   **Sub-elements:**
    1.  **Carcass:** Internal body (Ply/MDF). sqft of surface area (approx formula based on frontal area).
    2.  **Shutters:** Frontal Area (sqft).
    3.  **Loft:** Optional.
        *   *Logic:* Only available if (Ceiling Height - Wardrobe Height) > 1.5ft.
    4.  **Internal Drawers:** count.
*   **Finish:** Laminate, Membrane, Veneer, PU.
*   **Hardware:**
    *   *Hinges:* 4 per door (standard height).
    *   *Handles:* 1 per door (or profile length).

### B) Headboard / Bed Back
**Scope Group ID:** `BED_HEADBOARD`
*   **Sub-elements:**
    1.  **Panel:** sqft (Width x Height).
    2.  **Upholstery:** Optional toggle (Fabric cost + Labor).
    3.  **Ledges:** Side tables integrated (Fixed).

### C) Study Unit (Optional)
**Scope Group ID:** `BED_STUDY`
*   **Sub-elements:**
    1.  **Desk Surface:** rft (Linear length).
    2.  **Overhead Storage:** Wall units (sqft).

---

## 🍳 KITCHEN

### A) Base Units
**Scope Group ID:** `KIT_BASE`
*   **Sub-elements:**
    1.  **Carcass:** rft or module count.
    2.  **Shutters:** sqft.
    3.  **Drawers (Tandem):** count.
        *   *Costing:* Mechanism cost + Front panel cost.
    4.  **Skirting:** rft (PVC/Alu).
*   **Material Logic:**
    *   *Constraint:* If Room=Kitchen, recommend BWP (Boiling Water Proof).

### B) Wall Units
**Scope Group ID:** `KIT_WALL`
*   **Sub-elements:**
    1.  **Carcass:** Reduced depth.
    2.  **Shutters:** sqft.

### C) Countertop
**Scope Group ID:** `KIT_COUNTER`
*   **Options:**
    1.  **Granite:** rft (Basic).
    2.  **Quartz:** rft (Premium).
    3.  **Sintered Stone:** rft (Luxury).

### D) Dado / Backsplash
**Scope Group ID:** `KIT_DADO`
*   **Sub-elements:**
    1.  **Tiles:** sqft.
    2.  **Quartz Strip:** rft.

---

## 🧱 COMMON ELEMENTS

### A) False Ceiling
*   **Logic:** Calculated per room.
*   **Formula:** `Room Area (L x W)`.

### B) Painting
*   **Logic:** `(L + W) * 2 * Height` - `Door/Window Deductions`.

### C) Skirting
*   **Logic:** `(L + W) * 2`.

---

## 🧠 LOGIC & RULES

**1. Construction Logic**
*   **TV Unit Height:** Limit to 2400mm (8ft).
*   **Wardrobe Depth:** Standard 600mm (24").
*   **Kitchen Base Height:** Standard 850mm - 900mm.

**2. Rate Mapping Example (TV Unit)**
*   `Total Cost` =
    (`Base Cabinet Qty` * `Carcass Rate` * `Finish Multiplier`) +
    (`Shutter Qty` * `Finish Rate`) +
    (`Hardware Cost`)

**3. Finish Layers**
*   **Laminate:** Base Rate.
*   **Membrane:** Base * 1.3.
*   **Veneer:** Base * 1.8 + Polish Cost.
*   **PU Paint:** Base * 2.0.
