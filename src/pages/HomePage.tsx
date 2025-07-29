import React, {useEffect, useState} from "react";
import { FaUsers, FaBook, FaExchangeAlt } from "react-icons/fa";
import type { LibraryMemberUser, LibraryMemberUserForm } from "../models/User.ts";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {addUserMember, deleteUserMember, getAllUser, updateUserMember} from "../service/userService.ts";
import type {Book, BookForm} from "../models/Books.ts";
import {bookSave, bookUpdate, deleteBook, getAllBook} from "../service/bookService.ts";
import type {BorrowBook, BorrowBookForm} from "../models/BorrowBook.ts";
import {getAllBorrowBook, overDueBorrowBook, saveBorrowBook, updateBorrowBook} from "../service/borrowBookService.ts";

export function HomePage() {
    const [activeTab, setActiveTab] = useState("members");
    const MySwal = withReactContent(Swal);

    //user Effect......................................................................................................
    useEffect(() => {
        handleGetAllUser()
        handleGetAllBooks()
        handleGetAllBorrowBook()
        handleCheckAllOverDue()
    }, []);


    //users..............................................................................................
    const [users, setUsers] = useState<LibraryMemberUser[]>([]);
    const [formData, setFormData] = useState<LibraryMemberUserForm>({
        name: "",
        email: "",
        contact: "",
        address: ""
    });


    //Handle Users...............................................................................

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleGetAllUser = async () => {
        try {
            const response = await getAllUser();
            console.log("getAllUser response:", response);
            if (response.status === 200) {
                setUsers(response.users);
            } else {
                console.error("Failed to load users", response.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.contact || !formData.address) {
            await showErrorAlert("Error", "Please fill all fields.");
            return;
        }
        try {
            console.log(formData);
            const response = await addUserMember(formData);

            if (response.status === 201) {
                setFormData({
                    name: "",
                    email: "",
                    contact: "",
                    address: ""
                });
                await handleGetAllUser();
                await showSuccessAlert("Success", "Member added successfully!");
            } else {
                await showErrorAlert("Error", "Failed to add member. Please try again.");
            }
        } catch (e) {
            console.error("Error adding member:", e);
            await showErrorAlert("Error", "Failed to add member. Please try again.");
        }
    };

    const handleRowClick = (user: LibraryMemberUser) => {
        console.log("Row clicked:", user);
        setFormData(user)
        setIsClick(true)
    }
    const handleUpdate = async () => {
        console.log("Update button clicked with data:", formData);
        try {
            const response = await updateUserMember(formData);

            if (response.status === 201) {
                setFormData({
                    name: "",
                    email: "",
                    contact: "",
                    address: ""
                });
                await handleGetAllUser();
                await showSuccessAlert("Success", "Member updated successfully!");
                setIsClick(false)
            } else {
                await showErrorAlert("Error", "Failed to update member. Please try again.");
            }
        } catch (e) {
            console.error("Error updating member:", e);
            await showErrorAlert("Error", "Failed to update member. Please try again.");
        }
    }
    const handledelete = async () => {
        console.log("Delete button clicked with data:", formData);
        try {
            const response = await deleteUserMember(formData)

            if (response.status === 200) {
                setFormData({
                    name: "",
                    email: "",
                    contact: "",
                    address: ""
                });
                await handleGetAllUser();
                await showSuccessAlert("Success", "Member deleted successfully!");
                setIsClick(false)
            } else {
                await showErrorAlert("Error", "Failed to delete member. Please try again.");
            }
        } catch (e) {
            console.log(e);
        }
    }


    //books...............................................................................................
    const [books, setBooks] = useState<Book[]>([]);
    const [bookFrom, setBookFrom] = useState<BookForm>({
        title: "",
        author: "",
        availableCopies: 0,
        totalCopies: 0,
        description: ""
    })

    const [click, setIsClick] = useState(false);
    const [bookClick, setBookIsClick] = useState(false);


    //Handle Books................................................................................
    const handleBookInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setBookFrom(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleBookSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(
            "Book data submitted:", bookFrom
        )

        try {
            if (bookFrom.totalCopies == 0 || bookFrom.availableCopies == 0) {
                await showErrorAlert("Validation Error", "Total copies and available copies must be greater than zero.");
                return;
            }
            const response = await bookSave(bookFrom);
            if (response.status === 201) {
                setBookFrom({
                    title: "",
                    author: "",
                    availableCopies: 0,
                    totalCopies: 0,
                    description: ""
                })
                await handleGetAllBooks();
                await showSuccessAlert("Success", "Book added successfully!");
            } else {
                await showErrorAlert("Error", "Failed to add book. Please try again.");
            }
        } catch (e) {
            console.log(e)
            showErrorAlert("Error", "Failed to add book. Please try again.");
        }

    }
    const handleBookUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("BOOK Update");
        try {
            const response = await bookUpdate(bookFrom);
            if (response.status === 200) {
                setBookFrom({
                    title: "",
                    author: "",
                    availableCopies: 0,
                    totalCopies: 0,
                    description: ""
                })
                setBookIsClick(false)
                await handleGetAllBooks();
                await showSuccessAlert("Success", "Book Update successfully!");
            } else {
                await showErrorAlert("Error", "Failed to update book. Please try again.");
            }
        } catch (e) {
            console.log(e)
            await showErrorAlert("Error", "Failed to add book. Please try again.");

        }

    }
    const handleBookDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("BOOK delete");
        try {
            const response = await deleteBook(bookFrom);
            if (response.status === 200) {
                setBookFrom({
                    title: "",
                    author: "",
                    availableCopies: 0,
                    totalCopies: 0,
                    description: ""
                })
                setBookIsClick(false)
                await handleGetAllBooks();
                await showSuccessAlert("Success", "Book delete successfully!");
            } else {
                await showErrorAlert("Error", "Failed to delete book. Please try again.");
            }
        } catch (e) {
            console.log(e)
            await showErrorAlert("Error", "Failed to delete book. Please try again.");
        }

    }
    const handleBookRowClick = (book: Book) => {
        console.log("Row clicked:", book);
        setBookFrom(book)
        setBookIsClick(true)
    }
    const handleGetAllBooks = async () => {
        try {
            const response = await getAllBook();
            if (response.status === 200) {
                const books: Book[] = response.books;
                setBooks(books);
            } else {
                await showErrorAlert("Error", "Failed to fetch books. Please try again.");
            }
        } catch (e) {
            console.log(e);
            await showErrorAlert("Error", "Failed to fetch books. Please try again.");
        }
    }

    //borrowBooks....................................................................................................
    const [borrowForm, setBorrowForm] = useState<BorrowBookForm>({
        bookId: '',
        bookTitle: '',
        memberId: '',
        memberEmail: '',
        borrowDate: new Date().toISOString().split('T')[0],
        returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'borrowed',
        payStatus: "paid",
        payAmount: 0
    });
    const [borrowRecords, setBorrowRecords] = useState<BorrowBook[]>([]);
    const [borrowRecords_2, setBorrowRecords_2] = useState<BorrowBook[]>([]);
    const [overDueBorrowRecords, setOverDueBorrowRecords] = useState<BorrowBook[]>([]);


    const showSuccessAlert = (title: string, html: string) => {
        return MySwal.fire({
            title: `<strong>${title}</strong>`,
            html: `<i>${html}</i>`,
            icon: 'success',
            background: '#1F2937',
            color: '#F3F4F6',
            confirmButtonText: 'OK',
            confirmButtonColor: '#F59E0B',
            buttonsStyling: false,
            customClass: {
                container: 'dark',
                popup: 'bg-gray-800 rounded-xl border border-gray-700',
                title: 'text-2xl font-bold text-white',
                htmlContainer: 'text-gray-300',
                confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/20'
            }
        });
    };
    const showErrorAlert = (title: string, html: string) => {
        return MySwal.fire({
            title: `<strong>${title}</strong>`,
            html: `<i>${html}</i>`,
            icon: 'error',
            background: '#1F2937',
            color: '#F3F4F6',
            confirmButtonText: 'OK',
            confirmButtonColor: '#F59E0B',
            buttonsStyling: false,
            customClass: {
                container: 'dark',
                popup: 'bg-gray-800 rounded-xl border border-gray-700',
                title: 'text-2xl font-bold text-white',
                htmlContainer: 'text-gray-300',
                confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/20'
            }
        });
    };


//borrow......................................................

    const handleBorrowInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setBorrowForm(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleBorrowSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await saveBorrowBook(borrowForm);
            if (response.status === 201) {
                await handleGetAllBorrowBook();
                setBorrowForm({
                    bookId: '',
                    bookTitle: '',
                    memberId: '',
                    memberEmail: '',
                    borrowDate: new Date().toISOString().split('T')[0],
                    returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    status: 'borrowed',
                    payStatus: "paid",
                    payAmount: 0
                });
                await showSuccessAlert("Success", "Book borrowed successfully!");
            } else {
                await showErrorAlert("Error", "Failed to borrow book. Please try again.");
            }

        } catch (e) {
            console.error("Error borrowing book:", e);
            await showErrorAlert("Error", "Failed to borrow book. Please try again.");
        }

    };


    const handleGetAllBorrowBook = async () => {
        try {
            const response = await getAllBorrowBook();
            if (response.status === 200) {

                const borrowRecords: BorrowBook[] = response.bookBorrows;
                setBorrowRecords(borrowRecords);


                const borrowRecordsStatusBorrow: BorrowBook[] = borrowRecords.filter(BR => BR.status === "borrowed");
                setBorrowRecords_2(borrowRecordsStatusBorrow);

                const overDueBorrowBook: BorrowBook[] = borrowRecords.filter(BR =>
                    BR.status === "borrowed" && new Date(BR.returnDate) < new Date()
                );
                setOverDueBorrowRecords(overDueBorrowBook);

            } else {
                await showErrorAlert("Error", "Failed to fetch borrow records. Please try again.");
            }
        } catch (e) {
            console.log(e);
            await showErrorAlert("Error", "Failed to fetch borrow records. Please try again.");
        }

    }

    const handleCheckAllOverDue = async () => {
        console.log(borrowRecords_2.length.valueOf())
    };

    const handleReturnBook = async (recordeId: string) => {
        try {
            const borrowID = recordeId;

            //getBorrowRecord
            const borrowRecord: BorrowBook | undefined = borrowRecords_2.find(record => record._id === borrowID);
            if (!borrowRecord) {
                await showErrorAlert("Error", "Borrow record not found.");
                return;
            }

            if (!borrowRecord) {
                await showErrorAlert("Error", "Borrow record not found.");
                return;
            }
            const response = await updateBorrowBook(borrowRecord);
            if (response.status === 200) {
                await handleGetAllBorrowBook();
                await showSuccessAlert("Success", "Book returned successfully!");
            } else {
                await showErrorAlert("Error", "Failed to return book. Please try again.");
            }

        } catch (e) {
            console.log(e)
        }

    };
    const handleSendEmail = async (recordeId: string) => {
        try{
            const borrowID = recordeId;

            const borrowRecord: BorrowBook | undefined = overDueBorrowRecords.find(record => record._id === borrowID);
            if (!borrowRecord) {
                await showErrorAlert("Error", "Borrow record not found.");
                return;
            }

            const response = await overDueBorrowBook(borrowRecord);
            if (response.status === 200) {
                await handleGetAllBorrowBook();
                await showSuccessAlert("Success", "Email sent successfully!");
            } else {
                await showErrorAlert("Error", "Failed to send email. Please try again.");
            }

        }catch (e){
            console.log(e);
            await showErrorAlert("Error", "Failed to send email. Please try again.");
        }

    }

        return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-64 bg-blue-800 text-white p-4">
                <h1 className="text-2xl font-bold mb-8">Library System</h1>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setActiveTab("members")}
                                className={`flex items-center w-full p-2 rounded-lg ${activeTab === "members" ? "bg-blue-700" : "hover:bg-blue-600"}`}
                            >
                                <FaUsers className="mr-3"/>
                                Members
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("books")}
                                className={`flex items-center w-full p-2 rounded-lg ${activeTab === "books" ? "bg-blue-700" : "hover:bg-blue-600"}`}
                            >
                                <FaBook className="mr-3"/>
                                Books
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("borrow")}
                                className={`flex items-center w-full p-2 rounded-lg ${activeTab === "borrow" ? "bg-blue-700" : "hover:bg-blue-600"}`}
                            >
                                <FaExchangeAlt className="mr-3"/>
                                Borrow Books
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`flex items-center w-full p-2 rounded-lg ${activeTab === "history" ? "bg-blue-700" : "hover:bg-blue-600"}`}
                            >
                                <FaExchangeAlt className="mr-3"/>
                                History Borrow Books
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("overDue")}
                                className={`flex items-center w-full p-2 rounded-lg ${activeTab === "overDue" ? "bg-blue-700" : "hover:bg-blue-600"}`}
                            >
                                <FaExchangeAlt className="mr-3"/>
                                OverDue Borrow Book
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="flex-1 p-8 overflow-auto">
                {activeTab === "members" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Members Management</h2>
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            {!click && (
                                <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
                            )}

                            {click && (
                                <h3 className="text-xl font-semibold mb-4">Update or Delete Member</h3>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {click && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Id</label>
                                            <input
                                                type="text"
                                                name="_id"
                                                value={formData._id}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                readOnly={true}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                                        <input
                                            type="tel"
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-4">
                                    {!click && (
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
                                        >
                                            Add Member
                                        </button>
                                    )}

                                    {click && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={handleUpdate}
                                                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
                                            >
                                                Update Member
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handledelete}
                                                className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition"
                                            >
                                                Delete Member
                                            </button>
                                        </>
                                    )}
                                </div>

                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Members List</h3>
                            {(!users || users.length === 0) ? (
                                <p className="text-gray-500">No members added yet.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user._id}
                                                onClick={() => handleRowClick(user)}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user._id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.contact}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.address}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "books" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Book Management</h2>
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            {!click && (
                                <h3 className="text-xl font-semibold mb-4">Add New Book</h3>
                            )}

                            {click && (
                                <h3 className="text-xl font-semibold mb-4">Update or Delete Book</h3>
                            )}

                            <form onSubmit={handleBookSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {bookClick && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Book
                                                Id</label>
                                            <input
                                                type="text"
                                                name="_id"
                                                value={bookFrom._id}
                                                onChange={handleBookInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                readOnly={true}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Book
                                            Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={bookFrom.title}
                                            onChange={handleBookInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                        <input
                                            type="text"
                                            name="author"
                                            value={bookFrom.author}
                                            onChange={handleBookInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Book available
                                            Copies</label>
                                        <input
                                            type="number"
                                            name="availableCopies"
                                            value={bookFrom.availableCopies}
                                            onChange={handleBookInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Book
                                            Total</label>
                                        <input
                                            type="number"
                                            name="totalCopies"
                                            value={bookFrom.totalCopies}
                                            onChange={handleBookInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Book
                                            Description</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={bookFrom.description}
                                            onChange={handleBookInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>

                                </div>

                                <div className="flex flex-wrap gap-4 mt-4">
                                    {!bookClick && (
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
                                        >
                                            Add Book
                                        </button>
                                    )}

                                    {bookClick && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={handleBookUpdate}
                                                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
                                            >
                                                Update Book
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleBookDelete}
                                                className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition"
                                            >
                                                Delete Book
                                            </button>
                                        </>
                                    )}
                                </div>

                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Book List</h3>
                            {(!books || books.length === 0) ? (
                            // {books.length === 0 ? (
                                <p className="text-gray-500">No Book added yet.</p>
                            ): (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available
                                                Copies
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total
                                                Copies
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {books.map(book => (
                                            <tr key={book._id}
                                                onClick={() => handleBookRowClick(book)}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book._id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.availableCopies}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.totalCopies}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.description}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "borrow" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Borrow Books</h2>
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h3 className="text-xl font-semibold mb-4">Create New Borrow Record</h3>

                            <form onSubmit={handleBorrowSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select
                                            Member</label>
                                        <select
                                            name="memberId"
                                            value={borrowForm.memberId}
                                            onChange={handleBorrowInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="">Select a member</option>
                                            {users && users.length > 0 ? (
                                                users.map(user => (
                                                    <option key={user._id} value={user._id}>
                                                        {user.name} ({user.email})
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No users found</option>
                                            )}

                                        </select>
                                    </div>

                                    {/* Book Selection */}
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select
                                            Book</label>
                                        <select
                                            name="bookId"
                                            value={borrowForm.bookId}
                                            onChange={handleBorrowInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="">Select a book</option>
                                            {books.filter(book => book.availableCopies > 0).map(book => (
                                                <option key={book._id} value={book._id}>
                                                    {book.title} by {book.author} (Available: {book.availableCopies})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Borrow Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Borrow
                                            Date</label>
                                        <input
                                            type="date"
                                            name="borrowDate"
                                            value={borrowForm.borrowDate}
                                            onChange={handleBorrowInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>

                                    {/* Due Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                        <input
                                            type="date"
                                            name="dueDate"
                                            value={borrowForm.returnDate}
                                            onChange={handleBorrowInputChange}
                                            min={borrowForm.borrowDate || new Date().toISOString().split('T')[0]}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>


                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            name="status"
                                            value={borrowForm.status}
                                            onChange={handleBorrowInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="borrowed">Borrowed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pay
                                            Status</label>
                                        <select
                                            name="payStatus"
                                            value={borrowForm.payStatus}
                                            onChange={handleBorrowInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="paid">pay</option>
                                            <option value="lending">lending</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="flex gap-4 mt-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
                                    >
                                        Save Record
                                    </button>


                                </div>
                            </form>
                        </div>


                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Borrow Records</h3>

                            {(!borrowRecords || borrowRecords.length === 0) ? (
                            // {borrowRecords.length === 0 ? (

                                <p className="text-gray-500">No borrow records found.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrow
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {borrowRecords_2.map(record => (
                                            <tr key={record._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {(() => {
                                                        const user = users?.find(u => u._id === record.memberId);
                                                        return (
                                                            <>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {user?.name || 'Unknown'}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {user?.email || ''}
                                                                </div>
                                                            </>
                                                        );
                                                    })()}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {books.find(b => b._id === record.bookId)?.title || 'Unknown'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {books.find(b => b._id === record.bookId)?.author || ''}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(record.borrowDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(record.returnDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${record.status === 'borrowed' ? 'bg-yellow-100 text-yellow-800' :
                        record.status === 'returned' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'}`}>
                      {record.status}
                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${record.payStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                                        'bg-blue-100 text-blue-800'}`}>
                                                        {record.payStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => handleReturnBook(record._id)}
                                                        className="text-green-600 hover:text-green-900 mr-4"
                                                    >
                                                        Mark Returned
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}


                {/**/}
                {activeTab === "history" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Borrow History</h2>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            {/*{(!borrowRecords || borrowRecords.length === 0) ? (*/}
                            {borrowRecords.length === 0 ? (

                                <p className="text-gray-500">No borrow history found.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrow
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment
                                                Status
                                            </th>
                                        </tr>
                                        </thead><tbody className="bg-white divide-y divide-gray-200">
                                    {borrowRecords?.map(record => (
                                        <tr key={record._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {users?.find(u => u._id === record.memberId)?.name || 'Unknown'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {users?.find(u => u.email === record.memberEmail)?.email || ''}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {books?.find(b => b._id === record.bookId)?.title || 'Unknown'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {books?.find(b => b._id === record.bookId)?.author || ''}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(record.borrowDate).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(record.returnDate).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
        <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                record.status === 'borrowed'
                    ? 'bg-yellow-100 text-yellow-800'
                    : record.status === 'returned'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
            }`}
        >
          {record.status}
        </span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
        <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                record.payStatus === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
            }`}
        >
          {record.payStatus}
        </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>

                                    </table>
                                </div>

                            )}
                        </div>
                    </div>
                )}
                {activeTab === "overDue" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">OverDue Books</h2>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            {borrowRecords.length === 0 ? (
                                <p className="text-gray-500">No overDue borrow book found.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrow
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {overDueBorrowRecords.map(record => (
                                            <tr key={record._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {users.find(u => u._id === record.memberId)?.name || 'Unknown'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {users.find(u => u._id === record.memberEmail)?.email || ''}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {books.find(b => b._id === record.bookId)?.title || 'Unknown'}
                                                    </div>
                                                    <div className="text-sm text-gray-
500">
                                                        {books.find(b => b._id === record.bookId)?.author || ''}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(record.borrowDate).toLocaleDateString()}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(record.returnDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${record.status === 'borrowed' ? 'bg-yellow-100 text-yellow-800' :
                                                        record.status === 'returned' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'}`}>
                                                        {record.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                        ${record.payStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                                        'bg-blue-100 text-blue-800'}`}>
                                                        {record.payStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => handleSendEmail(record._id)}
                                                        className="text-green-600 hover:text-green-900 mr-4"
                                                    >
                                                        Send Email
                                                    </button>
                                                </td>

                                            </tr>

                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}