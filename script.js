// Replace these with your own values
const SUPABASE_URL = "https://rvkymjchqqaxiyweupmy.supabase.co";
const SUPABASE_KEY = "sb_publishable_38_y-uPUg-Aq6i487cBpDQ_4WhfXCuI";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function loadPosts() {

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    const posts = document.getElementById("posts");
    posts.innerHTML = "";

    data.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.textContent = post.text;
        posts.appendChild(div);
    });
}

document.getElementById("post").onclick = async () => {

    const message = document.getElementById("message").value.trim();

    if (!message) return;

    const { error } = await supabase
        .from("posts")
        .insert({
            text: message
        });

    if (error) {
        console.error(error);
        return;
    }

    document.getElementById("message").value = "";

    loadPosts();
};

loadPosts();

// Refresh every 5 seconds
setInterval(loadPosts, 5000);
