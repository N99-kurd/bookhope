// ===== FIREBASE SETUP =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBU7XDZfTm4rGDH2LxeAYM1oRSXtBCpx8s",
    authDomain: "bookhope-6c62e.firebaseapp.com",
    projectId: "bookhope-6c62e",
    storageBucket: "bookhope-6c62e.firebasestorage.app",
    messagingSenderId: "317951396947",
    appId: "1:317951396947:web:468eefa021d4807c848aa6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
// data.js - shared between index.html and admin.html

const translations = {
    en: {
        heroTitle: "Share Knowledge, Change Lives",
        heroDesc: "Browse our collection of books and request the ones you love. We'll send them to you!",
        browseBtn: "Browse Books",
        availableBooksTitle: "Available Books",
        clickToRequest: "Click on a book to request it",
        requestBtn: "Request This Book",
        detailsBtn: "Details",
        author: "Author",
        contactUs: "Contact Us",
        quickLinks: "Quick Links",
        followUs: "Follow Us",
        footerHome: "Home",
        navHome: "Home",
navBrowse: "Browse Books",
        footerBooks: "Browse Books",
        footerTagline: "Share Knowledge, Change Lives",
        copyright: "© 2024 BookHope. All rights reserved.",
        requestTitle: "Request This Book",
        yourName: "Your Name",
        shippingAddress: "Shipping Address",
        submit: "Submit Request",
        successMessage: "Request submitted successfully!",
        bookAdded: "Book added successfully!",
        bookDeleted: "Book deleted successfully!",
        requestDeleted: "Request deleted successfully!",
        searchPlaceholder: "Search by title, author, or genre...",
        heroTitle: "Find Your Next Great Read",
heroDesc: "Explore books across all genres and find your favorite stories.",
browseBtn: "Browse Books",
    },
    ar: {
        heroTitle: "شارك المعرفة، غيّر الحياة",
        heroDesc: "تصفح مجموعتنا من الكتب واطلب الكتب التي تحبها. سنرسلها إليك!",
        browseBtn: "تصفح الكتب",
        availableBooksTitle: "الكتب المتاحة",
        clickToRequest: "انقر على الكتاب لطلبه",
        requestBtn: "طلب هذا الكتاب",
        detailsBtn: "التفاصيل",
        author: "المؤلف",
        contactUs: "اتصل بنا",
        quickLinks: "روابط سريعة",
        followUs: "تابعنا",
        footerHome: "الرئيسية",
        navHome: "الرئيسية",
navBrowse: "تصفح الكتب",
        footerBooks: "تصفح الكتب",
        footerTagline: "شارك المعرفة، غيّر الحياة",
        copyright: "© 2024 بوك هوب. جميع الحقوق محفوظة.",
        requestTitle: "طلب هذا الكتاب",
        yourName: "اسمك",
        shippingAddress: "عنوان الشحن",
        submit: "إرسال الطلب",
        successMessage: "تم إرسال طلبك بنجاح!",
        bookAdded: "تم إضافة الكتاب بنجاح!",
        bookDeleted: "تم حذف الكتاب بنجاح!",
        requestDeleted: "تم حذف الطلب بنجاح!",
        searchPlaceholder: "ابحث بالعنوان أو المؤلف أو النوع...",
        heroTitle: "اعثر على قراءتك القادمة",
heroDesc: "تصفح الكتب من جميع الأنواع واعثر على قصصك المفضلة.",
browseBtn: "تصفح الكتب",
heroTitle: "کتێبە بەردەستەکان بدۆزەرەوە",
heroDesc: "گەڕان لە هەموو جۆرەکاندا و دۆزینەوەی چیرۆکە خۆشەویستەکانت",
browseBtn: "گەڕان لە کتێبەکاندا",
    },
    ku: {
        heroTitle: "زانیاری بڵاو بکە، ژیان بگۆڕە",
        heroDesc: "گەڕان لە کتێبەکاندا و داواکردنی ئەو کتێبانەی دەتەوێت بیخوێنیتەوە. بۆت دەنێرم!",
        browseBtn: "سەیری کتێبەکان بکە",
        availableBooksTitle: "کتێبە بەردەستەکان",
        clickToRequest: "کلیک لەسەر کتێبەکە بکە بۆ داواکردن",
        requestBtn: "داواکردنی ئەم کتێبە",
        detailsBtn: "وردەکاری",
        author: "نووسەر",
        contactUs: "پەیوەندی پێوە بکە",
        quickLinks: "بەستەرە خێرا",
        followUs: "شوێن بگرە",
        footerHome: "ماڵەوە",
        navHome: "ماڵەوە",
navBrowse: "گەڕان لە کتێبەکاندا",
        footerBooks: "گەڕان لە کتێبەکاندا",
        footerTagline: "زانیاری بڵاو بکە، ژیان بگۆڕە",
        copyright: "© 2024 بوک هۆپ. هەموو مافەکان پارێزراون.",
        requestTitle: "داواکردنی ئەم کتێبە",
        yourName: "ناوی تۆ",
        shippingAddress: "ناونیشانی ناردن",
        submit: "ناردنی داواکاری",
        successMessage: "داواکاری تۆ بە سەرکەوتویی نێردرا!",
        bookAdded: "کتێبەکە بە سەرکەوتویی زیادکرا!",
        bookDeleted: "کتێبەکە بە سەرکەوتویی سڕایەوە!",
        requestDeleted: "داواکاری بە سەرکەوتویی سڕایەوە!",
        searchPlaceholder: "بگەڕێ بە ناونیشان، نووسەر، یان جۆر...",
    }
};
const genreTranslations = {
    en: {
        Medical: "Medical",
        History: "History",
        Religion: "Religion",
        "Novels/Fiction": "Novels/Fiction",
        "Children's Books": "Children's Books",
        "Self-Help": "Self-Help"
    },
    ar: {
        Medical: "طبي",
        History: "تاريخ",
        Religion: "دين",
        "Novels/Fiction": "روايات/خيال",
        "Children's Books": "كتب أطفال",
        "Self-Help": "تطوير الذات"
    },
    ku: {
        Medical: "پزیشکی",
        History: "مێژوو",
        Religion: "ئایین",
        "Novels/Fiction": "ڕۆمان/خەیاڵی",
        "Children's Books": "کتێبی منداڵان",
        "Self-Help": "خۆپاراستن"
    }
};

// Default books (only used the very first time, before anything is saved)
const defaultBooks = [
    {
        id: 1,
        title_en: "The Great Gatsby",
        title_ar: "غاتسبي العظيم",
        title_ku: "گاتسبی گەورە",
        author_en: "F. Scott Fitzgerald",
        author_ar: "ف. سكوت فيتزجيرالد",
        author_ku: "ف. سکۆت فیتزجیرالد",
        desc_en: "A classic American novel",
        desc_ar: "رواية أمريكية كلاسيكية",
        desc_ku: "رۆمانێکی کلاسیکی ئەمریکی",
        image_url: "https://via.placeholder.com/200x300?text=The+Great+Gatsby"
    },
    {
        id: 2,
        title_en: "To Kill a Mockingbird",
        title_ar: "قتل الطائر المحاكي",
        title_ku: "کوشتنی بازی مۆکینگبێرد",
        author_en: "Harper Lee",
        author_ar: "هاربر لي",
        author_ku: "هاربەر لی",
        desc_en: "A story of racial injustice",
        desc_ar: "قصة عن الظلم العنصري",
        desc_ku: "چیرۆکێکی دەربارەی ناداروستی نەتەوەیی",
        image_url: "https://via.placeholder.com/200x300?text=To+Kill+a+Mockingbird"
    }
];

// ===== SHARED STORAGE FUNCTIONS =====
async function loadBooks() {
    const snapshot = await getDocs(collection(db, "books"));
    
    // If database is completely empty, populate it with default books once
    if (snapshot.empty) {
        for (const book of defaultBooks) {
            const { id, ...bookData } = book; // remove local numeric ID
            await addDoc(collection(db, "books"), bookData);
        }
        // Fetch again after saving defaults
        const newSnapshot = await getDocs(collection(db, "books"));
        return newSnapshot.docs.map(docSnap => ({ ...docSnap.data(), firestoreId: docSnap.id }));
    }

    return snapshot.docs.map(docSnap => ({ ...docSnap.data(), firestoreId: docSnap.id }));
}

async function addBookToDb(book) {
    await addDoc(collection(db, "books"), book);
}

async function updateBookInDb(firestoreId, book) {
    await updateDoc(doc(db, "books", firestoreId), book);
}

async function deleteBookFromDb(firestoreId) {
    await deleteDoc(doc(db, "books", firestoreId));
}

async function loadRequests() {
    const snapshot = await getDocs(collection(db, "requests"));
    return snapshot.docs.map(docSnap => ({ ...docSnap.data(), firestoreId: docSnap.id }));
}

async function addRequestToDb(request) {
    await addDoc(collection(db, "requests"), request);
}

async function deleteRequestFromDb(firestoreId) {
    await deleteDoc(doc(db, "requests", firestoreId));
}
// ===== AUTH FUNCTIONS =====
async function signUp(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

async function logIn(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

async function logInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
}

async function checkRedirectResult() {
    const result = await getRedirectResult(auth);
    return result ? result.user : null;
}


async function logOut() {
    await signOut(auth);
}

function watchAuthState(callback) {
    onAuthStateChanged(auth, callback);
}
// ===== FAVORITES FUNCTIONS =====
async function toggleFavorite(userId, bookId) {
    const favRef = doc(db, "favorites", userId + "_" + bookId);
    const favSnap = await getDoc(favRef);

    if (favSnap.exists()) {
        await deleteDoc(favRef);
        return false; // now unfavorited
    } else {
        await setDoc(favRef, { userId: userId, bookId: bookId });
        return true; // now favorited
    }
}

async function loadUserFavorites(userId) {
    const snapshot = await getDocs(collection(db, "favorites"));
    return snapshot.docs
        .map(docSnap => docSnap.data())
        .filter(fav => fav.userId === userId)
        .map(fav => fav.bookId);
}
window.loadBooks = loadBooks;
window.addBookToDb = addBookToDb;
window.updateBookInDb = updateBookInDb;
window.deleteBookFromDb = deleteBookFromDb;
window.loadRequests = loadRequests;
window.addRequestToDb = addRequestToDb;
window.deleteRequestFromDb = deleteRequestFromDb
// ===== CART FUNCTIONS =====
async function addToCart(userId, bookId) {
    await setDoc(doc(db, "carts", userId + "_" + bookId), { userId: userId, bookId: bookId });
}

async function removeFromCart(userId, bookId) {
    await deleteDoc(doc(db, "carts", userId + "_" + bookId));
}

async function loadUserCart(userId) {
    const snapshot = await getDocs(collection(db, "carts"));
    return snapshot.docs
        .map(docSnap => docSnap.data())
        .filter(item => item.userId === userId)
        .map(item => item.bookId);
}

async function clearUserCart(userId, bookIds) {
    for (const bookId of bookIds) {
        await deleteDoc(doc(db, "carts", userId + "_" + bookId));
    }
}
// Add exports at the very bottom of data.js:
export { 
    translations, 
    loadBooks, 
    addBookToDb, 
    updateBookInDb, 
    deleteBookFromDb, 
    loadRequests, 
    addRequestToDb, 
    deleteRequestFromDb,
    signUp,
    logIn,
    logInWithGoogle,
    checkRedirectResult,
    logOut,
    watchAuthState,
    toggleFavorite,
    loadUserFavorites,
    genreTranslations,
    addToCart,
    removeFromCart,
    loadUserCart,
    clearUserCart
  }
