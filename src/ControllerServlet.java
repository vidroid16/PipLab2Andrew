import mypkg.LabConst;
import mypkg.Pair;
import mypkg.Result;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            resp.setContentType("text/html;charset=UTF-8");
            //TODO get cookie jseccionid
            req.getRequestDispatcher("/check").forward(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            if (req.getParameterMap().size() == 0 || !req.getHeader("isUser").equals("true")) {
                System.out.println("OK");
                req.getRequestDispatcher("index.jsp").forward(req, resp);
            } else {
                @SuppressWarnings("unchecked")
                ArrayList<Pair<String, Result>> results = (ArrayList<Pair<String, Result>>) getServletContext().getAttribute(LabConst.RESULT_ARRAY);
                StringBuilder str = new StringBuilder();
                if (results != null) {
                    List<Result> resultList = results.stream().filter(p -> p.getKey().equals(req.getRequestedSessionId()))
                            .map(Pair::getValue).collect(Collectors.toList());
                    JSONArray resultJson = new JSONArray();
                    resultList.forEach(p -> {
                        JSONObject pJson = new JSONObject();
                        pJson.put("x", p.getX());
                        pJson.put("y", p.getY());
                        pJson.put("r", p.getR());
                        pJson.put("isIn", p.isIn());
                        resultJson.put(pJson);
                    });
                    resp.getWriter().print(resultJson.toString());
                }
            }
        }catch(NullPointerException e){
            System.out.println("OK");
            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }
    }
        //    @Override
//    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        ArrayList<String> list = new ArrayList<>();
//        String x = req.getParameter("x0");
//        System.out.println(req.getParameter("x0"));
//        resp.getWriter().print(x.isEmpty() ? "Hello world" : x);
//        getServletContext().setAttribute("list", list);
//        resp.setHeader("content-type", "text/html;charset=UTF-8");
//        req.getRequestDispatcher("index.jsp").include(req, resp);
//        //resp.sendRedirect("index.jsp");
//
//    }

}
