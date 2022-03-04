export const getScenariosAPI = async () => {
  try {
    const dir = "/data/scenario.json";

    const res = await fetch(dir, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getFilesAPI = async () => {
  try {
    const dir = "/data/fileData.json";

    const res = await fetch(dir, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err);
  }
};
