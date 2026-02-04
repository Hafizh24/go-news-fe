import FormCategory from "../components/form-category";

const CreateCategoryPage = () => {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Create Category</div>
      </div>

      <FormCategory type="ADD" />
    </div>
  );
};

export default CreateCategoryPage;
