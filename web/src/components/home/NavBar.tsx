import Link from 'next/link';
import React from 'react';

const NavBar = () => (
  <div className="grid w-full h-20 grid-flow-col px-4 pt-2 border-b-2 border-zinc-700 text-zinc-700">
    <div className="flex flex-row">
      <Link href="/#">
        <a href="/#" className="flex flex-row my-auto text-3xl font-semibold align-center">
          <i className="emoji text-5xl bg-[url('https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji@13.1.0/color/svg/1F4DD.svg')]" />
          <h1 className="my-auto">Note Rack</h1>
        </a>
      </Link>
    </div>
    <div className="flex flex-row-reverse">
      <Link href="/auth/login#">
        <a href="/auth/login#" className="px-5 py-2 my-auto text-xl font-semibold bg-red-400 rounded text-amber-50">Login</a>
      </Link>
    </div>
  </div>
);

export default NavBar;
