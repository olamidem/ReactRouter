import { UserPlusIcon } from "@heroicons/react/16/solid";
import { Form } from "react-router-dom";
import illustration from "../assets/illustration.jpg";

export function Into() {
  return (
    <div className="into">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal Budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        <Form method="post" action="">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
        <img src={illustration} alt="Person with money" width={600} />
      </div>
    </div>
  );
}
