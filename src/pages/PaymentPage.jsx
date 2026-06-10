import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import NavBar from '../components/NavBar.jsx';

const plans = [
  {
    name: 'Starter',
    price: '$0 / month',
    description: 'Ideal for small fish farms getting started with AI.',
    features: ['Basic water quality monitoring', 'Weather alerts', 'Fish health reports', 'Up to 2 AI farm agents', 'Mobile app access'],
  },
  {
    name: 'Professional',
    price: '$40 / month (billed annually $50/mo equivalent)',
    description: 'Perfect for growing fish farms looking to optimize yield.',
    features: ['Advanced water and fish analysis', 'Multiple pond integration', 'Up to 10 AI farm agents', 'Automated oxygen and temperature recommendations', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: '$400 / month (billed annually $500/mo equivalent)',
    description: 'Tailored solutions for large aquaculture businesses.',
    features: ['Custom fish farm dashboards', 'Unlimited AI agents', 'Full API & IoT integration', 'Enterprise-grade security', 'Dedicated account manager'],
  },
];

export default function PaymentPage({ onNavigate, onLanguageChange, language, billingCycle, setBillingCycle, paymentMethod, setPaymentMethod, onPay, paymentNotice, onBack }) {
  return (
    <div className="min-h-screen bg-[#063c25] text-white">
      <NavBar onNavigate={onNavigate} onLanguageChange={onLanguageChange} language={language} view="payment" />
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8">
        <Card>
          <div className="flex flex-col gap-6">
            <Button onClick={onBack} variant="ghost" className="self-start">Back</Button>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Payment Gateway</p>
              <h2 className="mt-4 text-3xl font-black text-white">From individual fish growers to aquaculture businesses — scale your farm with AI that fits your needs.</h2>
              <p className="mt-3 text-sm text-emerald-100/80">Choose the right plan and payment method, then validate before accessing the dashboard.</p>
            </div>
            <div className="flex flex-wrap gap-3 rounded-full border border-emerald-800/70 bg-emerald-950/60 p-1">
              <button onClick={() => setBillingCycle('annually')} className={`rounded-full px-4 py-2 text-sm font-bold ${billingCycle === 'annually' ? 'bg-emerald-400 text-[#063c25]' : 'text-emerald-100 hover:bg-emerald-800'}`}>Annually (Save 20%)</button>
              <button onClick={() => setBillingCycle('monthly')} className={`rounded-full px-4 py-2 text-sm font-bold ${billingCycle === 'monthly' ? 'bg-emerald-400 text-[#063c25]' : 'text-emerald-100 hover:bg-emerald-800'}`}>Monthly</button>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className="rounded-[1.75rem] border border-emerald-800/70 bg-emerald-950/60 p-5 shadow-lg shadow-emerald-950/30">
                <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-300/80">{plan.name}</p>
                <h3 className="mt-2 text-xl font-black text-white">{plan.description}</h3>
                <p className="mt-4 text-sm text-emerald-100/80">{plan.price}</p>
                <Button variant="primary" className="mt-4 w-full">{plan.name === 'Starter' ? 'Get Started' : plan.name === 'Professional' ? 'Join Now' : 'Talk to Sales'}</Button>
                <ul className="mt-4 space-y-2 text-sm text-emerald-100/80">
                  {plan.features.map((feature) => (
                    <li key={feature} className="rounded-2xl border border-emerald-800/70 bg-[#032214] p-2">{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={() => setPaymentMethod('momo')} className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${paymentMethod === 'momo' ? 'border-amber-400 bg-amber-500 text-slate-900' : 'border-emerald-700 bg-emerald-900/50 text-white'}`}>📱 Mobile Money (0789697077)</button>
            <button onClick={() => setPaymentMethod('card')} className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${paymentMethod === 'card' ? 'border-emerald-400 bg-emerald-500 text-slate-900' : 'border-emerald-700 bg-emerald-900/50 text-white'}`}>💳 Card Checkout</button>
          </div>

          <Button onClick={onPay} variant="primary" className="mt-5 w-full">Pay Now</Button>
          {paymentNotice && (
            <p className="mt-4 rounded-2xl bg-emerald-900/70 px-4 py-3 text-sm text-emerald-100">{paymentNotice}</p>
          )}
          <p className="mt-3 text-sm text-amber-200">Tip: Use the same email address you entered during login for a complete payment record.</p>
        </Card>
      </main>
    </div>
  );
}
