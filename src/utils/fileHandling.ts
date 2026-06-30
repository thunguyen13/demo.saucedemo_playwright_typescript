import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";


const DATA_FOLDER = path.join(__dirname, '..', 'data');

/**
 * To read data from json file
 * @param filePath file path to be read
 * @returns json data
 */
export function getDataFromJsonFile<T>(filePath: string): T[] {
    const fullPath = path.join(DATA_FOLDER, filePath);
    try {
        return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    } catch (error) {
        console.error(`Error reading or parsing file at ${fullPath}:`, error);
        throw error;
    }
}

/**
 * To read data from csv file
 * @param filePath file path to be read
 * @returns csv data in array
 */
export function getDataFromCsvFile(filePath: string) {
    const fullPath = path.join(DATA_FOLDER, filePath);
    try {
        let records: object[] = [];
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        records = parse(fileContent, {
            columns: true,
            trim: true,
            skip_empty_lines: true,
        });
        return records;
    } catch (error) {
        console.error(`Error reading or parsing file at ${fullPath}:`, error);
        throw error;
    }
}