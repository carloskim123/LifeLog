/// <reference types="vite/client" />


interface FontSettings {
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
}


interface SheetSettings {
    id: string;
    name: string;
    font: FontSettings;
    viewOnly: boolean;
    content: string;
}

interface SheetMeasurements {
    rows: number;
    cols: number;
}
