import { getData } from "./libs/fetch";
import { IPost } from "./types/entyty";

const API_URL = "https://v1.appbackend.io/v1/rows/rerbk3kR3BPN";
interface IPostResult {
  data: IPost[];
}

async function app() {
  const post = await getData<IPostResult>(API_URL);
  console.log(post);

  if (!post) {
    console.log("Error gan");
    return;
  }

  post.data.map((element) => {
    const titlePost = document.createElement("h1");
    const contentPost = document.createElement("p");

    titlePost.textContent = element.title;
    contentPost.textContent = element.content;

    document.body.append(titlePost, contentPost);
  });
}

app();

// Post Data
const inputTitle = document.getElementById("idTitle") as HTMLInputElement;
const inputContent = document.getElementById(
  "idContent"
) as HTMLTextAreaElement;
const btnSubmite = document.getElementById("actSubmite");

btnSubmite?.addEventListener("click", async () => {
  const title = inputTitle.value;
  const content = inputContent.value;
  try {
    const result = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        { content: content, attachment: "", title: title },
      ]),
    });

    console.log(result.status);

    inputTitle.value = "";
    inputContent.value = "";
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
});
