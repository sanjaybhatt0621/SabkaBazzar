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
                        <input type="text" id="firstName" class="inputText" required/>
                        <label for="firstName" class="floating-label">First Name</label>
                    </article>

                    <article class="textfield">
                        <input type="text" id="lastName" class="inputText" required/>
                        <label  for="lastName"  class="floating-label">Last Name</label>
                    </article>
                    
                    <article class="textfield">
                        <input type="text" id="email" class="inputText" required/>
                        <label  for="email" class="floating-label">Email</label>
                    </article>

                    <article class="textfield">
                        <input type="text"  id="password" class="inputText" required/>
                        <label for="password"  class="floating-label">Password</label>
                    </article>

                    <article class="textfield">
                        <input type="text" id="confirmPassword" class="inputText" required/>
                        <label for="confirmPassword"  class="floating-label">Confirm Password</label>
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