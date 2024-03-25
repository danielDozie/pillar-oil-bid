import { Input } from './input'
import { Textarea } from './text-area'
import { Button } from './button'
import { BadgeCheck, BadgeX } from 'lucide-react'

export function ManageVendorComponent({ result }: any) {
  return (
      <div className="flex flex-col bg-slate-100 dark:bg-natural gap-x-4 ml-24 w-[calc(100%-7rem)] p-8 mt-24 mb-8 h-full rounded-2xl">
          <div className="flex flex-row gap-8">
              <div className="w-3/5">
                  <h2 className="text-xl font-bold mb-4 text-foreground">Vendor Profile</h2>
                  <div className="space-y-4 my-12 ml-12">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-500">Company Name</label>
                      <Input type="text" id="companyName" name="company_name" className="input text-xl font-semibold text-foreground" placeholder="Enter company name" value={result?.companyName} readOnly />

                      <label htmlFor="email" className="block text-sm font-medium text-gray-500">Email</label>
                      <Input type="email" id="email" name="email" className="input text-xl font-semibold text-foreground" placeholder="Enter email" value={result?.email} readOnly />

                      <label htmlFor="phone" className="block text-sm font-medium text-gray-500">Phone Number</label>
                      <Input type="tel" id="phone" name="business_phone" className="input text-xl font-semibold text-foreground" placeholder="Enter phone number" value={result?.businessPhone} readOnly />

                      <label htmlFor="phone" className="block text-sm font-medium text-gray-500">Home phone</label>
                      <Input type="tel" id="phone" name="home_phone" className="input text-xl font-semibold text-foreground" placeholder="Enter phone number" value={result?.homePhone} readOnly />

                      <label htmlFor="address" className="block text-sm font-medium text-gray-500">Address</label>
                      <Textarea id="address" name="address" className="input text-xl font-semibold text-foreground" placeholder="Enter address" value={result?.address} readOnly />

                      <div className="space-x-4">
                          <Button type="submit" id="save" className="btn bg-primary text-white px-12 py-4 rounded" disabled>Save</Button>
                          <Button variant='outline' id="edit" className="text-foreground px-12 py-4 rounded">Edit</Button>
                      </div>
                  </div>
              </div>
              <div className="w-2/5 pt-8">
                  <div className="bg-gray-200 justify-center items-center dark:bg-background-color size-64 rounded-full relative">
                      {result?.companyName && <div className="bg-gray-200 dark:bg-background-color size-64 rounded-full relative flex items-center justify-center text-7xl font-bold text-foreground">{result.companyName.charAt(0)}</div>}
                      <div className="flex flex-col justify-center items-center my-8">
                          {result?.user?.verified ? <BadgeCheck size={40} className={`text-primary`} /> : <BadgeX size={40} className={`text-foreground`} />}
                          <p className="text-foreground">{result?.user?.verified ? 'Verified' : 'Not verified'}</p>
                      </div>
                      <div className="flex">
                          <div className="flex flex-col mt-12">
                              <p className="text-lg font-semibold text-foreground">Bids</p>
                              <h1 className="text-4xl font-semibold text-foreground">0</h1>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}
