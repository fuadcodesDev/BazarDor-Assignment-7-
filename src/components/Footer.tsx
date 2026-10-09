
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e4ebe4] bg-[#fbfdfb]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-[#465449] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <p>
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}