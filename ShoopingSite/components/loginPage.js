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
                <form action="/#" >
                    <article class="textfield">
                        <input type="email" class="inputText" id="username" required/>
                        <label for="username" class="floating-label">Email</label>
                        <div class="requirements">Must be a valid email address.</div>
                    </article>

                    <article class="textfield">
                        <input type="password" class="inputText" id="password" pattern="pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$"" required/>
                        <label for="password" class="floating-label" >Password</label>
                        <div class="requirements">Your password must be at least 6 characters as well as contain at least one character and one number.</div>
                    </article>

                   <article>
                       <input type="submit" value="Login" class="submit-button"/>
                   </article>


                </form>
        </section>
    
    </main>`;
    $(this.parent).html(markUp);
    }
}