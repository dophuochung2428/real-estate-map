type Props = {
  form: any;

  setForm: any;
};

export default function PropertyMapPicker({ form, setForm }: Props) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Vị trí bản đồ</h2>

      <div className="h-[400px] rounded-3xl bg-gray-200" />
    </div>
  );
}
