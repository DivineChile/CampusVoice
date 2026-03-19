export default interface Animation {
  children: React.ReactNode;
  delay?: number; // optional stagger delay in ms
  className?: string;
}