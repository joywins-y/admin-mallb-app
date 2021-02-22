// 存储的是角色对应的权限的路由名称
const roleToRoute = {
  coustomer: [
    { name: 'Product' },
    { name: 'ProductList' },
    { name: 'ProductAdd' },
    { name: 'ProductEdit' },
  ],
  admin: [
    { name: 'Product' },
    { name: 'ProductList' },
    { name: 'ProductAdd' },
    { name: 'ProductEdit' },
    { name: 'Category' },
  ],
};

/**
 * 过滤掉没有权限的路由
 * @param {String} role   角色
 * @param {Array} routes 路由
 */
export default function getMenuRoutes(role, routes) {
  // 获取到对应角色有的权限 返回权限名称
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    // 判断传过来的路由是否被包含
    if (allowRoutesName.indexOf(r.name) !== -1) {
      // 判断子路由权限
      const { children } = obj;
      obj.children = children.filter((item) => allowRoutesName.indexOf(item.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
