export default class registerPage
{
    constructor(parent, request)
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
                <h1>Signup</h1>
                <p>We do not share your personal details with anyone.</p>
        </section>
        
        <section class="rightLogin">
                <form action="">
                    <article class="textfield">
                        <input type="text" class="inputText" required/>
                        <span class="floating-label">First Name</span>
                    </article>

                    <article class="textfield">
                        <input type="text" class="inputText" required/>
                        <span class="floating-label">Last Name</span>
                    </article>
                    
                    <article class="textfield">
                        <input type="text" class="inputText" required/>
                        <span class="floating-label">Email</span>
                    </article>

                    <article class="textfield">
                        <input type="text" class="inputText" required/>
                        <span class="floating-label">Password</span>
                    </article>

                    <article class="textfield">
                        <input type="text" class="inputText" required/>
                        <span class="floating-label">Confirm Password</span>
                    </article>

                   <article>
                       <a href="">Signup</a>
                   </article>


                </form>
        </section>
    
    </main>`;
        $(this.parent).html(markUp);
    }
}