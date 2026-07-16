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
        .order("created_at", { ascending: false });


    if(error){
        console.error(error);
        return;
    }


    const posts = document.getElementById("posts");
    posts.innerHTML = "";


    data.forEach(post=>{

        const div = document.createElement("div");
        div.className = "post";


        const text = document.createElement("p");
        text.textContent = post.text;


        // Report button
        const report = document.createElement("form");
        report.action = "https://formsubmit.co/caiiummog@gmail.com";
        report.method = "POST";
        report.target = "_blank";


        const hiddenPost = document.createElement("input");
        hiddenPost.type = "hidden";
        hiddenPost.name = "Reported post";
        hiddenPost.value = post.text;


        const hiddenSubject = document.createElement("input");
        hiddenSubject.type = "hidden";
        hiddenSubject.name = "_subject";
        hiddenSubject.value = "Reported ħėļļö post";


        const button = document.createElement("button");
        button.type = "submit";
        button.textContent = "Report";


        report.appendChild(hiddenPost);
        report.appendChild(hiddenSubject);
        report.appendChild(button);


        div.appendChild(text);
        div.appendChild(report);


        posts.appendChild(div);

    });

}



document.getElementById("post").addEventListener("click", async()=>{

    const box = document.getElementById("message");

    const text = box.value.trim();


    if(text === ""){
        return;
    }


    const { error } = await db
        .from("posts")
        .insert([
            {
                text: text
            }
        ]);


    if(error){
        console.error(error);
        alert(error.message);
        return;
    }


    box.value = "";

    loadPosts();

});



loadPosts();

setInterval(loadPosts,3000);
