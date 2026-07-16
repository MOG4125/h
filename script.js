const SUPABASE_URL = "https://rvkymjchqqaxiyweupmy.supabase.co";
const SUPABASE_KEY = "sb_publishable_38_y-uPUg-Aq6i487cBpDQ_4WhfXCuI";

const { createClient } = supabase;

const db = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function loadPosts(){

    const { data, error } = await db
        .from("posts")
        .select("*")
        .order("created_at", { ascending:false });

    if(error){
        console.error(error);
        return;
    }

    const posts = document.getElementById("posts");
    posts.innerHTML = "";

    data.forEach(post=>{

        const div=document.createElement("div");
        div.className="post";
        div.textContent=post.text;

        posts.appendChild(div);

    });

}

document.getElementById("post").addEventListener("click", async()=>{

    const box=document.getElementById("message");

    const text=box.value.trim();

    if(text==="") return;

    const { error } = await db
        .from("posts")
        .insert([
            {
                text:text
            }
        ]);

    if(error){
        console.error(error);
        alert(error.message);
        return;
    }

    box.value="";

    loadPosts();

});

loadPosts();

setInterval(loadPosts,3000);
