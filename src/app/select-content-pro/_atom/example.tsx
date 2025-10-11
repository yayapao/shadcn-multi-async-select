import SearcherExample from '../_example/searcher';
import CreateItemExample from '../_example/create-item';

const options = [
  { label: 'Son Goku', value: 'Son Goku' },
  { label: 'Naruto Uzumaki', value: 'Naruto Uzumaki' },
  { label: 'Monkey D. Luffy', value: 'Monkey D. Luffy' },
  { label: 'Sesshomaru', value: 'Sesshomaru' },
  { label: 'Kirito', value: 'Kirito' },
  { label: 'Levi Ackerman', value: 'Levi Ackerman' },
  { label: 'Mikoto Misaka', value: 'Mikoto Misaka' },
  { label: 'Light Yagami', value: 'Light Yagami' },
  { label: 'Izuku Midoriya', value: 'Izuku Midoriya' },
  { label: 'Gintoki Sakata', value: 'Gintoki Sakata' },
  { label: 'Ryoma Echizen', value: 'Ryoma Echizen' },
  { label: 'Mikasa Ackerman', value: 'Mikasa Ackerman' },
  { label: 'Lelouch Lamperouge', value: 'Lelouch Lamperouge' },
  { label: 'Rikka Takanashi', value: 'Rikka Takanashi' },
  { label: 'Jonathan Joestar', value: 'Jonathan Joestar' },
  { label: 'Tooru Amuro', value: 'Tooru Amuro' },
  { label: 'Yuji Sakai', value: 'Yuji Sakai' },
  { label: 'Koyomi Araragi', value: 'Koyomi Araragi' },
  { label: 'Akaza', value: 'Akaza' },
  { label: 'Tanjiro Kamado', value: 'Tanjiro Kamado' },
];

export default function Example() {
  return (
    <div className="flex flex-col gap-10 mt-4">
      <SearcherExample options={options} />
      <CreateItemExample options={options} />
    </div>
  );
}
