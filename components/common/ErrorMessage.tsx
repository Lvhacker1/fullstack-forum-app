const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="bg-red-50 text-red-800 px-4 py-3 rounded-md">
      {message}
    </div>
  )
}

export default ErrorMessage