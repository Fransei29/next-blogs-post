import ClientForm from './ClientForm';

export const metadata = {
    title: 'Add new blog',
    description: 'Page for adding a new blog post',
    icons: {
      icon: '/favicon.ico',
    },
};

export default function FormPage() {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Add new blog
            </h1>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <ClientForm />
          </div>
        </div>
      </main>
    </div>
  );
}