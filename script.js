// ========================================
// DEFAULT SHAYARI
// ========================================

let shayariList = [

    {
        text: "कुछ बातें दिल में रह जाती हैं,\nकुछ यादें आँखों में ठहर जाती हैं।",
        category: "Love"
    },

    {
        text: "मुस्कुराना भी एक कला है,\nहर किसी के बस की बात नहीं।",
        category: "Love"
    },

    {
        text: "जिंदगी छोटी सी है,\nइसे मुस्कुराकर जीना चाहिए।",
        category: "Motivation"
    },

    {
        text: "खामोशी भी बहुत कुछ कहती है,\nबस सुनने वाला चाहिए।",
        category: "Sad"
    },

    {
        text: "हमसे जलने वाले भी कमाल करते हैं,\nमहफिल अपनी और चर्चा हमारा करते हैं।",
        category: "Attitude"
    },

    {
        text: "दोस्ती नाम है सुख-दुख की कहानी का,\nदोस्ती राज है सदा मुस्कुराने का।",
        category: "Friendship"
    }

];


// ========================================
// LOCAL STORAGE से USER SHAYARI
// ========================================

const savedShayari =
    JSON.parse(localStorage.getItem("myShayari"));

if (savedShayari) {

    shayariList = savedShayari;

}


// ========================================
// VARIABLES
// ========================================

let currentIndex = 0;

let currentList = [...shayariList];

let likeCount = 0;


// ========================================
// SHOW SHAYARI
// ========================================

function showShayari() {

    if (currentList.length === 0) {

        document.getElementById("shayariText").innerText =
            "कोई Shayari नहीं मिली।";

        return;
    }

    const item = currentList[currentIndex];

    document.getElementById("shayariText").innerText =
        item.text;

    document.getElementById("categoryName").innerText =
        item.category;

}


// ========================================
// NEXT SHAYARI
// ========================================

function nextShayari() {

    if (currentList.length === 0) return;

    currentIndex++;

    if (currentIndex >= currentList.length) {

        currentIndex = 0;

    }

    showShayari();

    likeCount = 0;

    document.getElementById("likeCount").innerText = "0";

}


// ========================================
// SEARCH
// ========================================

function searchShayari() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    currentList = shayariList.filter(item =>

        item.text.toLowerCase().includes(search)

    );

    currentIndex = 0;

    showShayari();

}


// ========================================
// CATEGORY
// ========================================

function filterCategory(category) {

    if (category === "All") {

        currentList = [...shayariList];

    } else {

        currentList = shayariList.filter(item =>

            item.category === category

        );

    }

    currentIndex = 0;

    showShayari();

}


// ========================================
// COPY
// ========================================

function copyShayari() {

    const text =
        document.getElementById("shayariText").innerText;

    navigator.clipboard.writeText(text)
        .then(() => {

            alert("Shayari copy हो गई ❤️");

        });

}


// ========================================
// SHARE
// ========================================

function shareShayari() {

    const text =
        document.getElementById("shayariText").innerText;

    if (navigator.share) {

        navigator.share({

            title: "SHAYARI",

            text: text

        });

    } else {

        alert("Share option इस browser में उपलब्ध नहीं है।");

    }

}


// ========================================
// LIKE
// ========================================

function likeShayari() {

    likeCount++;

    document.getElementById("likeCount").innerText =
        likeCount;

}


// ========================================
// FAVORITE
// ========================================

function favoriteShayari() {

    const item =
        currentList[currentIndex];

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.some(
        fav => fav.text === item.text
    );

    if (!exists) {

        favorites.push(item);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        alert("Favorite में जोड़ दी गई ⭐");

    } else {

        alert("यह पहले से Favorite में है।");

    }

    showFavorites();

}


// ========================================
// SHOW FAVORITES
// ========================================

function showFavorites() {

    const container =
        document.getElementById("favoriteList");

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    container.innerHTML = "";

    if (favorites.length === 0) {

        container.innerHTML =
            "<p>अभी कोई Favorite Shayari नहीं है।</p>";

        return;

    }

    favorites.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "favorite-item";

        div.innerText =
            "⭐ " + item.text;

        container.appendChild(div);

    });

}


// ========================================
// COMMENT BOX
// ========================================

function showCommentBox() {

    const box =
        document.getElementById("commentBox");

    if (box.style.display === "block") {

        box.style.display = "none";

    } else {

        box.style.display = "block";

    }

}


// ========================================
// ADD COMMENT
// ========================================

function addComment() {

    const input =
        document.getElementById("commentText");

    const comment =
        input.value.trim();

    if (comment === "") {

        alert("पहले comment लिखिए।");

        return;

    }

    const commentDiv =
        document.createElement("div");

    commentDiv.className =
        "comment";

    commentDiv.innerText =
        "💬 " + comment;

    document
        .getElementById("comments")
        .appendChild(commentDiv);

    input.value = "";

}


// ========================================
// ADD NEW SHAYARI
// ========================================

function addShayari() {

    const text =
        document.getElementById("newShayari")
        .value
        .trim();

    const category =
        document.getElementById("shayariCategory")
        .value;


    if (text === "") {

        alert("पहले Shayari लिखिए।");

        return;

    }


    const newItem = {

        text: text,

        category: category

    };


    shayariList.push(newItem);


    // LocalStorage में save

    localStorage.setItem(
        "myShayari",
        JSON.stringify(shayariList)
    );


    // Current list update

    currentList = [...shayariList];

    currentIndex =
        currentList.length - 1;


    showShayari();


    document.getElementById("newShayari")
        .value = "";


    alert("आपकी Shayari permanently save हो गई ❤️");

}


// ========================================
// START
// ========================================

showShayari();

showFavorites();