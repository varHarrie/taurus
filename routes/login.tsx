export default function Login() {
  return (
    <form>
      <label for="username">Username</label>
      <input type="text" name="username" id="username" />
      <label for="password">Password</label>
      <input type="password" name="password" id="password" />
      <button type="submit">Login</button>
    </form>
  );
}
