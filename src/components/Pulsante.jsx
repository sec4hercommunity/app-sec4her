// Pulsante principale nel viola del brand.
export default function Pulsante({ children, ...props }) {
  return (
    <button
      type="submit"
      className="w-full cursor-pointer rounded-lg bg-brand px-4 py-3 font-mono font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-[#7d58ea] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.99]"
      {...props}
    >
      {children}
    </button>
  )
}
