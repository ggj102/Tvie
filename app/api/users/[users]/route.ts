import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

import { ManagementClient } from "auth0";
import { getManagementUser } from "@/api/authZero";

const management = new ManagementClient({
  domain: "dev-baluusoj6la1t0m1.us.auth0.com",
  clientId: "iJamHHlvNX3sG0p3JRnwF4EcPJLZi1W8",
  clientSecret:
    "8paW39nHreGh9V2PBkZdKVaBTVHbNi1VV7ku0sCcZhMxNjrbYcaY6dRHq6MX65jK",
});

export async function GET() {
  const session = await getSession();

  console.log(session, "유저");

  // return NextResponse.json({ foo: 'bar' }, res);
}

export async function PATCH(request: Request) {
  const userData: any = await getManagementUser();
  const { searchParams } = new URL(request.url);

  const contentsId: any = searchParams.get("contents_id");
  const contentsType: any = searchParams.get("contents_type");

  const { favorites } = userData?.user_metadata;

  const copyArr = [...favorites[contentsType]];

  const includesId = copyArr.includes(contentsId);

  let movie = [...favorites.movie];
  let tv = [...favorites.tv];
  let person = [...favorites.person];

  let updateArr = [];

  if (includesId) {
    const filter = copyArr.filter((val: any) => val !== contentsId);
    updateArr = [...filter];
  } else {
    copyArr.push(contentsId);
    updateArr = [...copyArr];
  }

  switch (contentsType) {
    case "movie":
      movie = [...updateArr];
      break;
    case "tv":
      tv = [...updateArr];
      break;
    case "person":
      person = [...updateArr];
      break;
  }

  const params = { id: `${userData?.user_id}` };
  const metadata = {
    user_metadata: {
      ...userData?.user_metadata,
      favorites: {
        movie,
        tv,
        person,
      },
    },
  };

  const results = await management.users
    .update(params, metadata)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return NextResponse.json(results);
}
