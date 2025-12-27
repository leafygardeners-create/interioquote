# Grayscale Wireframes: Consumer Interface

**Design Language:**
*   **Font:** Monospace for numbers, clean Sans-serif for text.
*   **Layout:** High density, spreadsheet-like grid, clear borders.
*   **Color:** Grayscale. Black (text), White (bg), Grey (borders/inactive).
*   **Components:** Tables, Accordions, Toggles, Tooltips.

---

## Screen 1: Landing Page

**Layout:** Split screen or Center Focus.
**Hero Section:**
*   **Headline:** "Stop Guessing. Start Costing."
*   **Sub-head:** "Get a line-item interior Bill of Quantities (BOQ) in 5 minutes. No sales calls. No renders. Just accurate math."
*   **CTA:** [ Upload Floor Plan ] (Primary) | [ I don't have a plan ] (Secondary)

**Value Prop Table (Comparison):**
| Feature | Typical Design Firm | This Platform |
| :--- | :--- | :--- |
| **First Interaction** | Sales Call / "Free Consultation" | Instant Quote Engine |
| **Pricing** | "Estimates" / Bundles | Itemized BOQ |
| **Scope** | Vague / "Premium Finish" | Defined Specifications |
| **Output** | Moodboards | Cost Breakdown |

**Trust Signals:**
*   "10,000+ Quotes generated."
*   "Pricing data updated: [Current Month]"

---

## Screen 2: Upload & Room Confirmation

**State 1: Upload**
*   **Drop Zone:** "Drop PDF or Image of Floor Plan here."
*   **Instruction:** "Ensure room labels are visible for best results."
*   **Progress:** "Scanning... 85%" -> "Found: Living, Kitchen, 3 Bedrooms."

**State 2: Confirmation (Table View)**
*   **Header:** "We detected the following spaces. Please confirm dimensions."

| Room Name | Detected Size | Adjusted Size | Action |
| :--- | :--- | :--- | :--- |
| Living Room | 14' x 16' | [ 14 ] x [ 16 ] | [Delete] |
| Master Bed | 12' x 12' | [ 12 ] x [ 12 ] | [Delete] |
| Kitchen | 10' x 8' | [ 10 ] x [ 8 ] | [Delete] |
| **+ Add Room** | | | |

*   **Confidence Note:** "⚠️ Sizes are approximate based on scale. Adjust for higher accuracy."
*   **Footer:** [ Confirm & Proceed ]

---

## Screen 3: Scope Preview (Per Room)

**Layout:** Sidebar (Room List) | Main Content (Scope Table).

**Sidebar:**
*   Living Room (Selected)
*   Master Bed
*   Kitchen

**Main Content:**
*   **Header:** "Living Room Scope" (14' x 16')
*   **Instruction:** "Uncheck items you do not need."

| Include | Item Category | Default Assumption | Dimensions |
| :---: | :--- | :--- | :--- |
| [x] | TV Unit | Wall-mounted, Standard | 6' x 1.5' |
| [x] | False Ceiling | Peripheral Only | 224 sq.ft |
| [ ] | Shoe Rack | (Excluded) | - |
| [x] | Electrical | Point relocation only | 10 Points |

*   **Explainability:** *Hovering on "Wall-mounted" shows tooltip: "Base unit + overhead ledge. No paneling."*
*   **Footer:** "Estimated Scope Cost: ₹X - ₹Y" | [ Next Room ]

---

## Screen 4: Cost Driver Selection (Global)

**Header:** "Define Quality Standards"
**Note:** "These choices apply to all rooms. You can customize specific rooms later."

**Driver 1: Core Material**
| Option | Description | Price Impact | Select |
| :--- | :--- | :--- | :---: |
| **Commercial (MR)** | Moisture Resistant Plywood. Good for dry areas. | Baseline | ( ) |
| **BWP Grade** | Boiling Water Proof. Essential for Kitchen/Baths. | +15% | (o) |

**Driver 2: Surface Finish**
| Option | Description | Price Impact | Select |
| :--- | :--- | :--- | :---: |
| **Laminate** | 1mm Laminate. High durability, wide range. | Baseline | (o) |
| **Acrylic** | High Gloss, scratch resistant. | +30% | ( ) |
| **Veneer** | Natural wood layer. Requires polish. | +60% | ( ) |

**Driver 3: Hardware**
| Option | Description | Select |
| :--- | :--- | :---: |
| **Indian Standard** | Godrej / Ebco or equivalent. | (o) |
| **International** | Hettich / Hafele (Soft Close). | ( ) |

*   **Live Ticker:** "Current Est. Total: ₹5,40,000" (Updates instantly)
*   **Footer:** [ Generate BOQ ]

---

## Screen 5: BOQ Results Screen

**Header:** "Your Detailed Cost Breakdown"
**Actions:** [ Download PDF ] | [ Share ] | [ Expert Review ]

**Summary Bar:**
*   **Total Cost:** **₹5,42,800** (Excl. Tax)
*   **GST (18%):** ₹97,704
*   **Grand Total:** **₹6,40,504**

**Detailed BOQ Table (Accordion by Room):**

**> Living Room (Total: ₹1,20,000)**
| Item | Spec | Qty | Rate | Amount |
| :--- | :--- | :--- | :--- | :--- |
| **TV Unit** | Plywood (BWP) + Laminate | 30 sft | ₹1,800 | ₹54,000 |
| *Hardware* | Hettich Hinges | 4 nos | ₹400 | ₹1,600 |
| **False Ceiling**| Gypsum, Peripheral | 224 sft | ₹110 | ₹24,640 |
| ... | ... | ... | ... | ... |

**> Kitchen (Total: ₹2,10,000)**
*   [Expand to see details]

**> Master Bedroom (Total: ₹1,50,000)**
*   [Expand to see details]

---

## Screen 6: Assumptions & Exclusions View

**Placement:** Usually a tab or a section below the BOQ.

**Header:** "Transparency Check: What is NOT included"

**Exclusions Table (Red/Warning Context):**
| Category | Status | Reason |
| :--- | :--- | :--- |
| **Civil Work** | EXCLUDED | Requires site inspection. |
| **Loose Furniture**| EXCLUDED | Sofas/Chairs vary too much in price. |
| **Appliances** | EXCLUDED | Buy directly from Amazon/Croma. |
| **Decor/Curtains** | EXCLUDED | Personal taste items. |

**Assumptions Table (Info Context):**
| Item | Assumption Made |
| :--- | :--- |
| **Floor Height** | Standard 10ft ceiling height assumed. |
| **Wall Condition** | Walls are plumb (straight). No civil repairs needed. |
| **Electrical** | Main supply available at distribution box. |

*   **Disclaimer:** "This quote is 95% accurate for the defined scope. Final 5% depends on site conditions."
