export type Book = {
    _id: string;
    title: string;
    author: string;
    availableCopies: number;
    totalCopies: number;
    description: string;
}

export type BookForm = {
    _id?: string;
title: string;
author: string;
availableCopies: number;
totalCopies: number;
description: string;
}