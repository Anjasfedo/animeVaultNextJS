# Build Modern Next 14 Server Side App with Server Actions, Infinite Scroll & Framer Motion Animations


## 1. Server Actions Crash Course

nextjs have server component, and after that they release server actions

server actions that can make is a function run on server, but we can use it like an ordinary function of javascript

we can use it by using: "use server"

for example a client react component that have an async function, on that function use "use server": "use client"

async function requestUserName(formData) {
    "use server"
    const username = formData.get("username")
    // ...
}

export default function App() {
    return (
        <form action={requestUserName}>
            <input type="text" name="username" />
            <button type="submit>Request</button>
        </form>
    )
}

the code above is some how equal to this code: "use client"

async function requestUserName(formData) {
    const response = await fetch("some_url", {
        method: "POST",
        header: {
            Content-Type: "application/json"
            // Add another if needer
        },
        body: JSON.Stringfy({
            username: fromData.get("username"),
            // Another request payload
        })
    })
}

export default function App() {
    return (
        <form action={requestUserName}>
            <input type="text" name="username" />
            <button type="submit>Request</button>
        </form>
    )
}

we use server action to reduce our code, less the code. so we can focuse with business logic.

with api we not only need to make request, we also need to make the api

but with server action, we dont need api at all, because nextjs handle it

the problem of server action is because they use Post method, for now server action is not compitable for another device(not web)

server action less our client side code. server action still work event javascript is disable, because it use server side render

about the spinner, because it logic is on browser, they are pure client client component

the advantage of server action:
less client code
page load faster
better response
good for seo
also improve core web vitals, crawl budget, crawl ranking
and user exprience(ux)
and most importanly they improve dx(developer exprience), because we can develop faster


server action not only can use just with client component, we can also use server action on server component like: import { fetchAnimes } from "./action"

async function Home(formData) {
    const animes = await fetchAnimes(1)
    return (
        <main>
            <section>
                {animes}
            </section>
            <LoadMore />
        </main>
    )
}

export default Home()

for the fetchAnimes like: "use server"

export async function fetchAnimes(page: number) :Promise<AnimeCard[]> {
    const response = await fetch("some-url")
    
    const data = await response.json()
}


why post method use on fetch anime,
because we actualy use get method, where we get a whole html page. because the function is in server, so it will give html page to client

but we also post use on scroll, we request the component on api

we can use server action to get list of data. not only that it also can be use to mutation (crud)


## 2. Implement Server Actions

1. firstly we can clone the main branch of this github repositiry: https://github.com/adrianhajdin/anime_vault.git
by use :git clone https://github.com/adrianhajdin/anime_vault.git

2. open it on vscode, we get the initialize code, with data on /app/_data.ts that have 20 data of anime

3. on /app/layout.tsx, we have Hero (header), Footer, some font, meta data, and the children

4. install the dependecy with npm install

5. to reduce the appearance of code, especialy of tailwind, we can use an extension name inline fold

6. then we can npm run dev to run the program

7. next we will use data fetch from api to get data of anime to show it

8. now add new file on /app/action.ts, on that use server

9. have an async function name fetchAnime, that fetch data from api with await on response variable. the api we use is https://shikimori.one/api/animes

10. then make variable name data with value of await response.json(), and return the data like

11. because this function is only declarative, we need to export it to use it on another react component with: 

12. open /app/page.tsx, and make a new variable name data that have value await fetchAnime, the function from action.ts like:

13. next we can add query on the api by add ?page=1.

14. we even can change the page value with argument of function, by change it with string literal that use the argument

15. also we need to pass limit on the api, with and query where &limit=8 

16. and add another and query &order=popularity on the api like:

17. so we can back to /app/page.tsx, so we can pass a parameter for page on fetchAnime function

18. and we successful get the data, but the page not show data properly

19. define the type of index

20. then on /component/AnimeCard.tsx.

21. the image not show because we only get the end point of image url, so we can add domain to use it like: `http://shikimori.one${anime.image.original}`

22. so we get a page and 8 of anime data show up on our app

23. next we will use LoadMore to scroll and get new page, new anime data


## 3. Infinite Scroll in Next 14
1. open /components/LoadMore.tsx, we will load more card on this page, with paginate. so when we scroll it will fetch more data

2. the main on here is instead of trigger fetch with button, we will fetch by scroll on spesific on screen(end of screen)

3. to do that, we can use a library, install it with: npm install react-intersection-observer

4. so now we can use it by: import { useInView } from "react-intersection-observer"

5. to use that we can create new variable that destruct an object have ref end inView prop with value useInView() like:   const { ref, inView } = useInView()

6. because we use a hook, add "use client" on top of out page

7. so all of page is render by server. but only the LoadMore component is render by client

8. add an attribute ref equal to {ref} on div tag like:     <>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>

9. next we can use the useEffect hook, with dependecy of array inView like:   useEffect(() => {

  }, [inView]);

10. inside the useEffect we will add the logic, for now lets show alert if we on the end of page

11. dont forget to create a conditional first if we get the inView like:   useEffect(() => {
    if (inView) {
      // logic here
    }
  }, [inView]);

12. we can change the logic with our fetchAnime function from action.ts like:    useEffect(() => {
    if (inView) {
      fetchAnime(2)
    }
  }, [inView]);

13. also we need to pass the argument of page number by 2 

14. then we can use .then to get res, and set the res we get on data with useState hook, the initial value will be empty array like:   const [data, setData] = useState([]);

  useEffect(() => {
    if (inView) {
      fetchAnime(2)
        .then((res) => {
          
        })
    }
  }, [inView]);

15. on the setData, we not only set the new data we get from fetch to the data, but we need to stay the old data

16. to do that we can use spread operator of old data, also we spread the rest to add all res on setData like:  setData([...data, ...res])

17. so we need to define the type of array on data useState, we can use AnimeProp of array on /.AnimeCard.tsx like:     const [data, setData] = useState<AnimeProp[]>([]);

18. also add the array dependency on useEffect with data like:   useEffect(() => {
    if (inView) {
      fetchAnime(2)
        .then((res) => {
          setData([...data, ...res])
        })
    }
  }, [inView, data]);

19. because we already fetch anime data when we once open the page, but in LoadMore we need to show anime data too

20. to do that we can copy the section that map the anime data on /app/page.tsx like: return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );

21. also dont forget to import AnimeCard component, so this section is subsequent page from page one

22. when we open our website, we can scroll the page to end, so we will get more anime card. but the image/data we get will be repeat if we scroll more

23. to fixed it we need to implement a new variable that is Page, we have to track the page currently

24. so we can declare a let variable on the /component/LoadMore.tsx, add variable name page with value 2 like: let page = 2;

25. so below of setData, we can increment the page value, and also we use the page variable as argument that we passing on fetchAnime function like:     useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);
26. so when we try the website, we now get unique image for every page

## 4. Framer Motion Next 14
1. to add animation, we will use framer motion
2. since every components is server render, we need to do
3. install framer motion with: npm i framer-motion
4. then we can navigate to components/animeCard.tsx, we will implement the animation in here
5. in react we can easy apply it, but in nextjs we use server rendering, and it will kinda hard
6. we start with import motion from framer-motion
7. then we can change div to motion.div and add attribute of variants with value variants:
8. then make variable variants with value object of hidden and visible with following value:
9. then add attribute initial with value hidden
10. and we add attribute animate with value visible
11. next add attribute transition with value an object have prop delay, ease, and duration
12. and add attribute of viewport that have value an object with prop amount in it:
13. so we will get this code for the div attribute:variants={variants}
    initial="hidden"
    animate="visible"
    transition={{ 
      delay: 1,
      ease: "easeInOut",
      duration: 0.5
     }}
     viewport={{ amount: 0 }}
14. now if we see the app, we will get an error, because we use serverside rendering
15. we can change this div to new component
16. then we make new component on components name MotionDiv
17. this component become client component and also import the motion from framer motion. then export motion.div like: "use client";
import { motion } from "framer-motion";

export const MotionDiv = motion.div;

18. so now the client side render will only render the div, and rest of them will be server side render
19. for now our animation its not good enough, because when we reload the page, we can notice that there is nothing and then all appear at once
20. next we well add animation on AnimeCard of Page and LoadMore
21. we can accept index as prop on AnimeCard component
20. and we can stagger the animation for every subsequent card
22. for delay we can use index * 0.25, delay will increment for all index:       delay: index * 0.25,
21. And we get another problem, when we scroll all to button, we need time to wait load process
22. to fix it we can do apply the stagger on spesific page.
23. now we can open our action on /app/action.ts
24. on it instead  only return data, we also can return the component themself
25. let copy the entire data.map on /app/page.tsx
26. then we can retun data as map, and then we need to change the file action.ts to action.tsx, we get action like: "use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const fetchAnime = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );

  const data = await response.json();

  return data.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ))
};

27. and we need to import AnimeCard and AnimeProp from AnimeCard.tsx, like:
28. because we already give data as map. we can simply delete map method on page.tsx and LoadMore.tsx like: <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
29. now we get error from typescript. we can do export type of AnimeCard with value JSX.Element like: export type AnimeCard = JSX.Element;
30. and now we can replace the AnimeProp with AnimeCard
