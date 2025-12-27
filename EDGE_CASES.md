# Edge & Low-Confidence State Flows

This document details how the system handles failure modes, ambiguity, and complex user inputs without breaking the "quote-first" promise.

## 1. Poor Floor Plan Input
**Scenario:** User uploads a blurry image, a hand-drawn sketch, or a file without dimensions.
**System Response:**
*   **Detection:** OCR confidence score < 50%.
*   **UI State:** "Manual Override Mode."
*   **Message:** "We couldn't read the dimensions clearly. Please enter the room sizes manually to ensure an accurate quote."
*   **Action:**
    *   Display the uploaded image on the left (pan/zoom enabled).
    *   Show a form on the right: [ Room Name ] [ Length ] [ Width ].
    *   "Add Room" button prominent.
*   **Why:** Don't guess if the guess is likely wrong. Fall back to explicit user input.

## 2. Low Confidence Room Detection
**Scenario:** System detects a room but isn't sure if it's a Bedroom or a Study.
**System Response:**
*   **UI State:** "Verify Room Type."
*   **Visual:** Room highlighted in Orange.
*   **Prompt:** "Is this a Bedroom? (Based on size, it could be a Study)."
*   **Options:** [ Yes, Bedroom ] | [ Change to Study ] | [ Change to Guest Room ].
*   **Impact:** Changing room type changes the *Default Scope* (e.g., Study gets a desk, Bedroom gets a wardrobe).

## 3. Conflicting Inputs (The "Impossible" Combo)
**Scenario:** User selects "Budget Material (MDF)" but "Premium Finish (PU Paint)".
**System Response:**
*   **Type:** Blocking Warning.
*   **Message:** "Recommendation: PU Paint is not recommended on MDF substrates due to warping risks."
*   **Action:**
    *   [ Switch to Plywood (Recommended) ]
    *   [ Switch to Laminate Finish ]
    *   [ Proceed anyway (Void Warranty) ]
*   **Why:** Prevents the user from creating a technically unsound order.

## 4. Unsafe Cost Drivers (The "Too Cheap" Trap)
**Scenario:** User tries to deselect essential hardware (e.g., handles/hinges) or chooses extremely low-grade materials for wet areas (Kitchen).
**System Response:**
*   **Type:** Critical Alert.
*   **Message:** "Caution: Using Non-BWP board in the Kitchen will lead to water damage within 1-2 years."
*   **Visual:** Red warning icon next to the selection.
*   **Action:**
    *   User must check a box: "I understand the risk and accept no warranty."
*   **Why:** Protects the platform's reputation and sets clear expectations.

## 5. System Asking for Human Review
**Scenario:** User requests "Custom Civil Work" or "Antique Finish" that isn't in the rate card.
**System Response:**
*   **UI State:** "Expert Review Required."
*   **Action:**
    *   Item is added to BOQ with Price: "On Request".
    *   Total Cost shows: "₹5,00,000 + Custom Items".
    *   Prompt at end: "Your quote includes custom items. An expert needs 24 hours to price these. Submit for Review?"
*   **Why:** Maintains the automation for 90% of the quote while handling the 10% bespoke needs gracefully.
