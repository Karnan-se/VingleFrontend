

import { Card } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"

export default function ProfilePage() {
  return (
    <div className="flex-1 p-6">
      <Card className="p-6">
        <h1 className="mb-8 text-center text-2xl font-semibold">Content Creators Details</h1>
        
        <form className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Basics</h2>
            <Input
              label="First Name"
              placeholder="Karnan"
              variant="bordered"
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              variant="bordered"
            />
            <Input
              label="Description"
              placeholder="describe about you in one sentence"
              variant="bordered"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Skills</h2>
            <Input
              placeholder="Enter your skills"
              variant="bordered"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Qualification</h2>
            <Input
              placeholder="Enter your qualification"
              variant="bordered"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Social Media</h2>
            <Input
              label="Twitter"
              placeholder="http://twitter.com/"
              variant="bordered"
            />
            <Input
              label="LinkedIn"
              placeholder="http://www.linkedin.com/"
              variant="bordered"
            />
          </div>

          <div className="flex justify-center">
            <Button
              color="primary"
              className="min-w-[200px]"
            >
              Save
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

