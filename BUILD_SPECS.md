# Build Specifications (Engineering Handover)

This document translates the UX designs into technical requirements for the engineering team.

## Global Dependencies
*   **Pricing Engine:** A deterministic calculator based on `(Qty * Rate) + Margin`.
*   **Room Database:** Standard dimensions and default scopes for typical Indian rooms (Master Bed, Kids Bed, Kitchen, Living).
*   **OCR / Vision API:** Integration (e.g., Google Vision or similar) to parse floor plan images/PDFs.

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
    *   `DefaultScopeRules`: Mapping of Room Type -> List of Items (e.g., Bedroom -> Wardrobe, Bed, Side Table).
    *   `ItemMetadata`: Definitions for tooltips (e.g., "Wardrobe" description).
*   **User Actions:**
    *   `toggleItem(itemId, boolean)`
*   **Outputs:**
    *   `UserScope`: List of selected items per room.

## Screen 4: Cost Drivers (Global Configuration)
*   **Data Required:**
    *   `MaterialOptions`: List [Commercial, BWP] with `priceMultiplier`.
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
    *   `downloadPDF()`
    *   `saveQuote()`
*   **Outputs:**
    *   Generated PDF Document.
    *   User Account creation (optional/lazy).

## Screen 6: Admin Panel (Rate Card)
*   **Data Required:**
    *   `MasterRateTable`: The full database of raw material costs.
*   **User Actions:**
    *   `updateCell(id, column, newValue)`
    *   `bulkImport(csv)`
    *   `publishVersion()`
*   **System Logic:**
    *   *Audit Log:* Record `timestamp`, `user`, `oldVal`, `newVal` for every change.
    *   *Validation:* Prevent negative numbers or zero-cost items (unless explicitly allowed).
