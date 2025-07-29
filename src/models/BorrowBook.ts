export type BorrowBook = {
    _id: string;
    bookId: string;
    bookTitle: string;
    memberId: string;
    memberEmail: string;
    borrowDate: Date;
    returnDate: Date;
    status: string;
    payStatus: string;
    payAmount: number;
}
export type BorrowBookForm = {
    _id?: string;
    bookId: string;
    bookTitle?: string;
    memberId: string;
    memberEmail?: string;
    borrowDate: string;
    returnDate: string;
    status: "borrowed" | "returned" | "overdue";
    payStatus: "paid" | "lending";
    payAmount: number;
}

export type updateBookForm = {
    id: string
}
