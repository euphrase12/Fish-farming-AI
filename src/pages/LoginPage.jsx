import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import NavBar from '../components/NavBar.jsx';

export default function LoginPage({ onNavigate, onLanguageChange, language, onLogin, onCreateAccount, onBack }) {
  return (
    <div className="min-h-screen bg-[#063c25] text-white">
      <NavBar onNavigate={onNavigate} onLanguageChange={onLanguageChange} language={language} view="login" />
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8">
        <Card>
          <div className="flex flex-col gap-6">
            <Button onClick={onBack} variant="ghost" className="self-start">Back</Button>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Farmer Login</p>
              <h2 className="mt-4 text-3xl font-black text-white">Access your Smart Fish Farming AI workspace</h2>
              <p className="mt-3 text-sm text-emerald-100/80">Login to continue or create an account before payment validation unlocks the dashboard.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <form onSubmit={onLogin} className="rounded-[1.75rem] border border-emerald-800/70 bg-emerald-950/60 p-5">
                <label className="block text-sm text-emerald-200">Email address</label>
                <input type="email" placeholder="Email address" className="mt-2 w-full rounded-2xl border border-emerald-700 bg-[#022414] px-4 py-3 text-sm text-white" required />
                <label className="mt-4 block text-sm text-emerald-200">Password</label>
                <input type="password" placeholder="Password" className="mt-2 w-full rounded-2xl border border-emerald-700 bg-[#022414] px-4 py-3 text-sm text-white" required />
                <Button type="submit" variant="primary" className="mt-5 w-full">Continue to Payment</Button>
              </form>
              <div className="rounded-[1.75rem] border border-emerald-800/70 bg-emerald-950/70 p-5 text-sm text-emerald-100">
                <p className="font-bold text-emerald-300">Create account</p>
                <p className="mt-3">New farmers can register for the same secure payment and dashboard flow. Your account will keep payments and fish health insights together.</p>
                <Button onClick={onCreateAccount} variant="secondary" className="mt-5 w-full">Create Account</Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
