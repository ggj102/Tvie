import { NextResponse } from "next/server";
import { authManagement, getManagementUser } from "@/api/authZero";

export async function GET() {
  const userData = await getManagementUser();

  return NextResponse.json(userData);
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

  const results = await authManagement.users
    .update(params, metadata)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return NextResponse.json(results);
}
