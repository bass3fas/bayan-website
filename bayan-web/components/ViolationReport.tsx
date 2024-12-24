export default function ViolationReport() {
    return (
        <div className="bg-white shadow-md p-10 max-w-2xl mx-auto mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Violation Report</h2>
            <form className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                    <input type="text" id="name" name="name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-9 p-2" />
                </label>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                    <input type="email" id="email" name="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-9 p-2"/>
                </label>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                    <textarea id="message" name="message" rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"></textarea>
                </label>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    File Upload
                    <input type="file" id="file" name="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"/>
                </label>
          
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit</button>
                
            </form>
        </div>
    )
}
