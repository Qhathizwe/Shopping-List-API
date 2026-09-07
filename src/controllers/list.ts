import { type listItem } from "../types/listItem.js";

let List: listItem[] = [];

let currentId = 1;

export const getList = (): listItem[] => {
    return List;
}

export const getItemById = (id: number): listItem | undefined => {
    const list = List.find(item => item.id === id);
    return list;
}

export const addItem = (name: string, quantity: number, category: string, notes: string): listItem => {
    const newItem: listItem = { id: currentId++, name, quantity, category, notes, isPurchased: false };
    List.push(newItem);
    return newItem;
}

export const deleteItemById = (id: number): listItem | undefined => {
    const index = List.findIndex((item) => item.id === id)
    if (index === -1) return undefined
    const [removed] = List.splice(index, 1)
    return removed
}
export const updateItem = (id: number, updatedFields: Partial<listItem>): listItem | undefined => {
    const item = List.find((item) => item.id === id)
    if (!item) return undefined

    if (updatedFields.name !== undefined) item.name = updatedFields.name;
    if (updatedFields.quantity !== undefined) item.quantity = updatedFields.quantity;
    if (updatedFields.category !== undefined) item.category = updatedFields.category;
    if (updatedFields.notes !== undefined) item.notes = updatedFields.notes;
    if (updatedFields.isPurchased !== undefined) item.isPurchased = updatedFields.isPurchased;

    return item
}