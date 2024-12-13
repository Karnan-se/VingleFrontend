import { Button } from "@nextui-org/react"


export default function PhotoMain(){


    return(
        <>
        <div className="bg-white border rounded-lg p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Photo</h1>
          <p className="text-gray-600">Add a nice photo of yourself</p>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="aspect-video max-w-md mx-auto bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Image Preview</p>
            </div>
          </div>

          <div className="flex items-center justify-between max-w-md mx-auto">
            <span className="text-gray-600">Add/change Image</span>
            <Button
              color="default"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Upload Image
            </Button>
          </div>
        </div>
      </div>
        </>
    )

}