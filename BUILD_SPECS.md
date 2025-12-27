# Build Specifications (Engineering Handover)

This document translates the UX designs into technical requirements for the engineering team.

## Global Dependencies
*   **Pricing Engine:** A deterministic calculator based on `(Qty * Rate) + Margin`.
*   **Scope Engine:** Interprets the definitions in `SCOPE_DEFINITIONS.md`.
    *   Logic: `Unit -> Sub-elements -> Finish -> Hardware`.
*   **Room Database:** Standard dimensions and default scopes for typical Indian rooms.
*   **OCR / Vision API:** Integration to parse floor plan images/PDFs.

---

## Data Models (Backend)

**1. Scope Definition Model**
```json
{
  "scope_id": "LIV_TV_UNIT",
  "name": "TV Unit",
  "sub_elements": [
    {
      "id": "base_cab",
      "name": "Base Cabinet",
      "unit_type": "rft",
      "qty_formula": "room_width * 0.8",
      "allowed_finishes": ["lam", "veneer", "pu"]
    },
    {
      "id": "wall_panel",
      "name": "Wall Panel",
      "unit_type": "sqft",
      "qty_formula": "tv_size_factor * room_height"
    }
  ],
  "hardware_rules": {
    "hinges_per_door": 2,
    "channel_type": "soft_close"
  }
}
```

**2. Rate Card Model**
```json
{
  "item_id": "MAT_PLY_BWP",
  "base_rate": 110,
  "labor_rate": 45,
  "margin_percent": 0.15,
  "unit": "sqft"
}
```

---

## Screen 1: Landing Page
*   **Data Required:**
    *   `TotalQuotesGenerated` (Count)
    *   `LastPriceUpdate` (Date)
*   **User Actions:**
    *   `uploadFile(file)`
    *   `selectNoPlan()`
*   **Outputs:**
    *   Session ID.
    *   Uploaded file stored in S3/Blob.

## Screen 2: Upload & Room Confirmation
*   **Data Required:**
    *   Processed JSON from OCR: `[{ room: "Bedroom", w: 12, h: 14, confidence: 0.9 }, ...]`
*   **User Actions:**
    *   `updateRoomDimensions(id, w, h)`
    *   `deleteRoom(id)`
    *   `addRoom(type)`
    *   `confirmRooms(roomList)`
*   **Outputs:**
    *   `UserRoomList`: Validated array of rooms with dimensions.

## Screen 3: Scope Preview (Per Room)
*   **Data Required:**
    *   `DefaultScopeRules`: Mapping of Room Type -> List of Scope Groups (e.g., Bedroom -> Wardrobe, Bed).
    *   `ItemMetadata`: Definitions for tooltips.
*   **User Actions:**
    *   `toggleItem(itemId, boolean)`
*   **Outputs:**
    *   `UserScope`: List of selected items per room.

## Screen 4: Cost Drivers (Global Configuration)
*   **Data Required:**
    *   `MaterialOptions`: List [Commercial, BWP].
    *   `FinishOptions`: List [Laminate, Acrylic, Veneer] with `priceMultiplier`.
    *   `HardwareOptions`: List [Indian, International].
*   **User Actions:**
    *   `selectMaterial(id)`
    *   `selectFinish(id)`
    *   `selectHardware(id)`
*   **System Logic:**
    *   *Real-time Calculation:* Trigger pricing engine re-calc on every selection change.
    *   *Constraint Check:* If (Material=MDF & Finish=PU) -> Return Warning.

## Screen 5: BOQ Results
*   **Data Required:**
    *   `CalculatedBOQ`: Nested JSON object.
        *   `GrandTotal`
        *   `Rooms`: Array of Room objects with Item breakdowns.
        *   `Tax`: Calculation based on region.
*   **User Actions:**
    *   `expandRoom(id)`
    *   `expandItem(id)`
        *   *Drill-down:* Show Sub-elements (Carcass cost, Shutter cost).
    *   `downloadPDF()`
    *   `saveQuote()`
*   **Outputs:**
    *   Generated PDF Document.

## Screen 6: Admin Panel (Rate Card & Scope)
*   **Data Required:**
    *   `MasterRateTable`: The full database of raw material costs.
    *   `ScopeDefinitions`: The JSON logic for assemblies.
*   **User Actions:**
    *   `updateCell(id, column, newValue)`
    *   `editScopeAssembly(json)`
    *   `publishVersion()`
*   **System Logic:**
    *   *Audit Log:* Record all changes.
    *   *Validation:* Ensure formulas are valid JS/Math expressions.
