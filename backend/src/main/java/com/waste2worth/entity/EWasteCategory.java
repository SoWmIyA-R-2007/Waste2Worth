package com.waste2worth.entity;

public enum EWasteCategory {
    LAPTOP,
    DESKTOP,
    SMARTPHONE,
    TABLET,
    SMARTWATCH,
    PRINTER,
    ROUTER,
    TELEVISION,
    REFRIGERATOR,
    WASHING_MACHINE,
    MICROWAVE,
    KEYBOARD,
    MOUSE,
    PCB,
    RAM,
    HARD_DISK,
    SSD,
    POWER_SUPPLY,
    BATTERY,
    CHARGER,
    OTHER;

    public static EWasteCategory fromString(String text) {
        if (text == null) return OTHER;
        String normalized = text.trim().toUpperCase().replace("-", "_").replace(" ", "_");
        for (EWasteCategory category : values()) {
            if (category.name().equals(normalized)) return category;
            if (category.name().startsWith(normalized)) return category;
        }
        if (normalized.contains("PHONE")) return SMARTPHONE;
        if (normalized.contains("LAPTOP") || normalized.contains("MACBOOK")) return LAPTOP;
        if (normalized.contains("DESKTOP") || normalized.contains("MONITOR") || normalized.contains("CPU")) return DESKTOP;
        if (normalized.contains("BATTERY")) return BATTERY;
        if (normalized.contains("APPLIANCE") || normalized.contains("FRIDGE")) return REFRIGERATOR;
        return OTHER;
    }
}
