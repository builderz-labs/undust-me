import { HomeIcon } from '@heroicons/react/20/solid';

export default function BreadCrumbs({ pages }: any) {
  return (
    <div className="p-4 px-0">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex space-x-4 rounded-md  px-3 shadow">
          <li className="flex">
            <div className="flex items-center">
              <a href="/" className="text-gray-400 hover:text-gray-100">
                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {pages.map((page: any) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  className="h-[70%] w-1 flex-shrink-0 text-gray-100"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <a
                  href={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-100"
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
