export default class loginPage
{
    constructor(parent,request)
    {
        this.parent = parent;
        this.request = request;
        this.render();
    }

    render()
    {
        let markUp =
        `<main class="loginMain">

        <section class="leftLogin">
                <h1>Login</h1>
                <p>Get access to your Orders, Whislist and Recommendations</p>
        </section>
        
        <section class="rightLogin">
                <form action="/#/login" >
                    <article class="textfield">
                        <input type="text" class="inputText" id="username" required/>
                        <label for="username" class="floating-label">Email</span>
                    </article>

                    <article class="textfield">
                        <input type="text" class="inputText" id="password" required/>
                        <label for="password" class="floating-label">Password</span>
                    </article>

                   <article>
                       <a href="">Login</a>
                   </article>


                </form>
        </section>
    
    </main>`;
    $(this.parent).html(markUp);
    }
}