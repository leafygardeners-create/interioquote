# Explainability Layer: The "Why" and "How"

This document maps how the system builds trust through explanation, assumptions, and confidence signals.

## 1. Global Explainability Patterns

*   **Inline Tooltips (dashed underline):** Used for technical terms (e.g., "BWP", "Carcass", "Soft-close").
    *   *Interaction:* Hover/Tap.
    *   *Content:* Plain English definition + durability implication.
*   **"Why this Price?" Link:** Next to every major sub-total.
    *   *Interaction:* Opens a modal showing the Rate Card logic (e.g., "Area x Rate + Hardware Cost").
*   **Confidence Meters:** Colored indicators (Green/Orange/Red) showing how certain the system is about a specific guess.

## 2. Screen-Specific Explainability

### Screen 2: Room Detection
*   **Feature:** Auto-detected room sizes.
*   **Confidence Signal:**
    *   *Green Check:* "High Confidence (Clear lines detected)."
    *   *Orange Warning:* "Low Confidence (Scale ambiguous). Please verify dimensions."
*   **Why:** Explains that the floor plan image quality affects accuracy, putting the responsibility of verification on the user.

### Screen 3: Scope Preview
*   **Feature:** Default items added (e.g., Wardrobe in Bedroom).
*   **Assumption Label:** "Standard Scope."
*   **Why:** Text below item: "Added based on room size > 100sq.ft."
*   **User Action:** If user removes an item, prompt: "Removing this will lower your quote, but you may need to buy it later."

### Screen 4: Cost Drivers
*   **Feature:** Material selection (e.g., Plywood vs. MDF).
*   **Trade-off Matrix:**
    *   Instead of just price, show a mini-table:
        | Material | Life | Water Resist? | Cost |
        | :--- | :--- | :--- | :--- |
        | MDF | 5 yrs | Low | $ |
        | Plywood | 15 yrs| High | $$ |
*   **Why:** Helps users make value-based decisions, not just price-based ones.

### Screen 5: BOQ Results
*   **Feature:** The final price.
*   **Assumption Banner:** Sticky header: "Based on [Standard] Material & [Laminate] Finish."
*   **Exclusion Highlights:**
    *   Asterisks (*) on totals.
    *   Footnote: "*Does not include Taxes or Civil work."
*   **Rate Breakdown:** Clicking a line item (e.g., "Wardrobe: ₹45,000") expands to:
    *   *Material Cost:* ₹20,000
    *   *Labor:* ₹15,000
    *   *Hardware:* ₹5,000
    *   *Margin:* ₹5,000
    *   *Why:* Radical transparency removes the fear of being overcharged.

## 3. The "Unknowns" Bucket

To handle uncertainty without stopping the flow, we introduce an "Unknowns" bucket in the final quote.

*   **Logic:** If a user asks for something complex (e.g., "Civil changes"), we don't guess the price.
*   **Display:**
    *   **Civil Work:** "TBD (Requires Visit)"
    *   **Total:** "₹5,00,000 + TBD"
*   **Why:** Prevents giving a false low price that changes later.
