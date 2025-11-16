import { signIn } from "@/auth"
import { CredentialsSignin } from "@auth/core/errors"

export function SignIn() {
  return (
    <form
      action={async formData => {
        "use server"
        try {
          await signIn("credentials", formData)
        } catch (error) {
          if (error instanceof CredentialsSignin) {
            console.log(error.message)
          }
        }
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}
