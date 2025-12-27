# Scope System Summary: Data Model & Control Logic

This document summarizes the full scope engine, defining the hierarchy from Space to Finishes and delineating user control vs. internal logic.

## 🛋 Living / Family Area

| Scope Group | Sub-elements | Finishes Available | User Control (Frontend) | Internal Logic (Backend) |
| :--- | :--- | :--- | :--- | :--- |
| **TV Unit** | • Base Cabinet<br>• Wall Panel<br>• Open Shelves<br>• Glass Shutters | Laminate, Membrane, Veneer, PU Paint | • Toggle Unit On/Off<br>• Select Finish Level<br>• Choose Hardware Tier | • Depth (450mm Base, 300mm Wall)<br>• Hinge Count per door<br>• Drawer Channel Logic |
| **Crockery Unit** | • Base Cabinet<br>• Wall Cabinet<br>• Glass Shutters<br>• LED Strip | Laminate, Membrane, Veneer, PU Paint | • Toggle Unit On/Off<br>• Add Mirror Backing | • Cabinet Depth Rules<br>• Glass Framing Cost |
| **Ceiling** | • Flat Gypsum<br>• Cove Light<br>• Perimeter Band | Paint (White/Color) | • Select Design Type (Flat/Cove) | • Area Calculation (L x W)<br>• Cove Rft Calculation |
| **Wall Finishes** | • Paint (Putty+Emulsion)<br>• Accent Wall<br>• Wallpaper | Paint (Standard/Royal), Wallpaper | • Select Wall for Accent<br>• Choose Wallpaper Grade | • Deduction for Doors/Windows<br>• Primer & Putty layers |

## 🛏 Bedroom

| Scope Group | Sub-elements | Finishes Available | User Control (Frontend) | Internal Logic (Backend) |
| :--- | :--- | :--- | :--- | :--- |
| **Wardrobe** | • Carcass (Body)<br>• Shutters (Door)<br>• Internal Drawers<br>• Loft (Optional) | Laminate, Membrane, Veneer, PU | • Toggle Loft On/Off<br>• Select Door Mechanism (Hinge/Slide) | • Loft allowed only if height gap > 1.5ft<br>• Internal Shelf Layout (Fixed Patterns)<br>• Hinge Qty (4/door) |
| **Headboard** | • Panel Board<br>• Upholstery<br>• Side Ledges | Fabric, Laminate, PU | • Toggle Upholstery | • Panel Width = Bed Width + Ledges |
| **Study Unit** | • Desk Surface<br>• Overhead Storage | Laminate, Membrane | • Toggle Unit On/Off | • Standard Desk Height (750mm)<br>• Desk Depth (600mm) |

## 🍳 Kitchen

| Scope Group | Sub-elements | Finishes Available | User Control (Frontend) | Internal Logic (Backend) |
| :--- | :--- | :--- | :--- | :--- |
| **Base Units** | • Carcass<br>• Shutters<br>• Tandem Drawers<br>• Skirting | Laminate, Acrylic, PU, Membrane | • Select Finish<br>• Choose Hardware Brand (Hettich/Ebco) | • Mandatory BWP Material for Sink Area<br>• Standard Height (850-900mm) |
| **Wall Units** | • Carcass<br>• Shutters | Laminate, Acrylic, PU, Membrane | • Toggle Wall Units On/Off | • Reduced Depth (300mm) |
| **Countertop** | • Slab | Granite, Quartz, Sintered Stone | • Select Material Category | • Rft Calculation based on Base Unit length |
| **Dado** | • Tiles<br>• Quartz Strip | Ceramic, Vitrified, Quartz | • Select Material Type | • Height Standard (600mm) |

## 🧱 Common / Global

| Scope Group | Sub-elements | Finishes Available | User Control (Frontend) | Internal Logic (Backend) |
| :--- | :--- | :--- | :--- | :--- |
| **False Ceiling** | • Gypsum Board<br>• Framing | Paint | • Apply to All Rooms | • Pricing Formula: Area x Rate |
| **Painting** | • Wall & Ceiling | Emulsion Types | • Select Paint Grade (Tractor/Royal) | • coat logic (2 coats vs 3 coats) |
| **Electrical** | • Point Relocation | - | • Add Extra Points | • Standard Point Count per Room Size |
