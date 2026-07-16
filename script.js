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

        const div = document.createElement("div");
        div.className = "post";


        const text = document.createElement("p");
        text.textContent = post.text;


        if(post.deleted){
            text.style.color = "grey";
        }


        // Report button + hidden hold admin
        const report = document.createElement("button");
        report.textContent = "Report";

        let timer;

        report.onmousedown = ()=>{

            timer = setTimeout(async()=>{

                const password = prompt("Password:");

                if(password === "pohold4"){

                    await db
                    .from("posts")
                    .delete()
                    .eq("id", post.id);

                    loadPosts();

                }

                else if(password === "popho44"){

                    await db
                    .from("posts")
                    .update({
                        text:"[deleted]",
                        deleted:true
                    })
                    .eq("id", post.id);

                    loadPosts();

                }

            },3000);

        };


        report.onmouseup = ()=>{
            clearTimeout(timer);
        };

        report.onmouseleave = ()=>{
            clearTimeout(timer);
        };


        // Edit button
        const edit = document.createElement("button");
        edit.textContent = "Edit";


        edit.onclick = async()=>{

            const password = prompt("Password:");

            if(password !== "pohold4"){
                alert("Wrong password");
                return;
            }


            const newText = prompt(
                "Change post text:",
                post.text
            );


            if(newText){

                await db
                .from("posts")
                .update({
                    text:newText,
                    deleted:false
                })
                .eq("id",post.id);


                loadPosts();

            }

        };


        div.appendChild(text);
        div.appendChild(report);
        div.appendChild(edit);

        posts.appendChild(div);

    });

}



document.getElementById("post").onclick = async()=>{

    const box = document.getElementById("message");

    const text = box.value.trim();


    if(!text) return;


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


    box.value = "";

    loadPosts();

};



loadPosts();

setInterval(loadPosts,3000);
